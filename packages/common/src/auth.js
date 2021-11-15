import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  CookieStorage
} from 'amazon-cognito-identity-js'
import axios from 'axios'
import * as utils from './shared/utils'

const cookieStorage = new CookieStorage({
  domain: process.env.COGNITO_COOKIE_DOMAIN ?? 'tracktak.com',
  secure: process.env.NODE_ENV
})

const POOL_CONFIG = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_APP_CLIENT_ID,
  Storage: cookieStorage
}

const userPool = new CognitoUserPool(POOL_CONFIG)

const AwsException = {
  NOT_AUTHORIZED_EXCEPTION: 'NotAuthorizedException',
  USERNAME_EXISTS_EXCEPTION: 'UsernameExistsException'
}

const CUSTOM_CHALLENGE_SESSION_KEY = 'customChallengeSession'
const CUSTOM_CHALLENGE_USERNAME_KEY = 'customChallengeUsername'
const CUSTOM_CHALLENGE_NEW_PASSWORD_KEY = 'customChallengeNewPassword'

const onCognitoFailure = (err, onError) => {
  if (err.code === AwsException.NOT_AUTHORIZED_EXCEPTION) {
    onError(Error('Incorrect username or password'))
    return
  }

  if (err.code === AwsException.USERNAME_EXISTS_EXCEPTION) {
    onError(Error('This email address has already been registered'))
    return
  }

  onError(Error('An error occured'))
}

export const signIn = (
  username,
  password,
  onSuccess,
  onFailure,
  newPasswordRequired = utils.noop
) => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
    Storage: cookieStorage
  })

  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  })

  user.authenticateUser(authDetails, {
    onSuccess,
    onFailure: err => onCognitoFailure(err, onFailure),
    newPasswordRequired
  })
}

export const signOut = () => {
  const user = getCurrentUser()
  if (user) {
    user.signOut()
  }
}

export const signUp = (
  email,
  password,
  onSuccess,
  onFailure,
  userAttributes = []
) => {
  userPool.signUp(email, password, userAttributes, null, (err, result) => {
    if (err) {
      onCognitoFailure(err, onFailure)
      return
    }
    onSuccess(result, email, password)
  })
}

export const getUserFromCode = async code => {
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('client_id', process.env.COGNITO_APP_CLIENT_ID)
  params.append('code', code)
  params.append('redirect_uri', process.env.GATSBY_SOCIAL_LOGIN_REDIRECT_URL)

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const response = await axios.post(
    process.env.GATSBY_COGNITO_TOKEN_ENDPOINT,
    params,
    config
  )
  const token = response.data

  const IdToken = new CognitoIdToken({
    IdToken: token.id_token
  })
  const AccessToken = new CognitoAccessToken({
    AccessToken: token.access_token
  })
  const RefreshToken = new CognitoRefreshToken({
    RefreshToken: token.refresh_token
  })

  const user = new CognitoUser({
    Username: IdToken.payload.username || IdToken.payload['cognito:username'],
    Pool: userPool
  })

  user.setSignInUserSession(
    new CognitoUserSession({
      IdToken,
      AccessToken,
      RefreshToken
    })
  )

  return user
}

export const getCurrentUser = () => {
  const user = userPool.getCurrentUser()
  if (user) {
    user.getSession(utils.noop)
  }
  return user
}

const clearCustomChallengeStorage = () => {
  localStorage.removeItem(CUSTOM_CHALLENGE_SESSION_KEY)
  localStorage.removeItem(CUSTOM_CHALLENGE_USERNAME_KEY)
  localStorage.removeItem(CUSTOM_CHALLENGE_NEW_PASSWORD_KEY)
}

export const sendEmailVerification = (
  username,
  onChallenge,
  onSuccess,
  onFailure,
  newPassword
) => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool
  })
  user.initiateAuth(
    new AuthenticationDetails({
      Username: user.getUsername()
    }),
    {
      onSuccess: session => {
        onSuccess(session)
      },
      onFailure: err => {
        onCognitoFailure(err, onFailure)
      },
      customChallenge: params => {
        localStorage.setItem(CUSTOM_CHALLENGE_SESSION_KEY, user.Session)
        localStorage.setItem(CUSTOM_CHALLENGE_USERNAME_KEY, username)
        if (newPassword) {
          localStorage.setItem(CUSTOM_CHALLENGE_NEW_PASSWORD_KEY, newPassword)
        }
        onChallenge(params)
      }
    }
  )
}

export const sendChallengeAnswer = (
  challengeAnswer,
  onSuccess,
  onFailure,
  onChallengeFailure
) => {
  try {
    const user = new CognitoUser({
      Username: localStorage.getItem(CUSTOM_CHALLENGE_USERNAME_KEY),
      Pool: userPool
    })
    user.Session = localStorage.getItem(CUSTOM_CHALLENGE_SESSION_KEY)
    const newPassword = localStorage.getItem(CUSTOM_CHALLENGE_NEW_PASSWORD_KEY)
    user.sendCustomChallengeAnswer(
      challengeAnswer,
      {
        onSuccess: (session, userConfirmationNecessary) => {
          clearCustomChallengeStorage()
          onSuccess(session, userConfirmationNecessary)
        },
        onFailure: err => {
          clearCustomChallengeStorage()
          onCognitoFailure(err, onFailure)
        },
        customChallenge: params => {
          onChallengeFailure(params)
        }
      },
      {
        ...(newPassword && {
          newPassword
        })
      }
    )
  } catch (e) {
    clearCustomChallengeStorage()
    onFailure(e)
  }
}

export const getUserData = handleGetUserData => {
  const user = getCurrentUser()
  return user.getUserAttributes(handleGetUserData)
}

export const changePassword = (
  oldPassword,
  newPassword,
  onSuccess,
  onError
) => {
  const user = getCurrentUser()
  user.changePassword(oldPassword, newPassword, (err, result) => {
    if (err) {
      onCognitoFailure(err, onError)
      return
    }

    onSuccess(result)
  })
}

export const updateContactDetails = (contactDetails, onSuccess, onError) => {
  const user = getCurrentUser()
  const updatedAttributes = Object.keys(contactDetails).map(key => ({
    Name: key,
    Value: contactDetails[key]
  }))

  user.updateAttributes(updatedAttributes, (err, result) => {
    if (err) {
      onCognitoFailure(err, onError)
      return
    }

    onSuccess(result)
  })
}
