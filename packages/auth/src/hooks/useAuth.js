import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback
} from 'react'
import {
  signUp as userSignUp,
  signIn as userSignIn,
  signOut as userSignOut,
  getCurrentUser,
  sendEmailVerification,
  sendChallengeAnswer as userSendChallengeAnswer,
  getUserData,
  changePassword,
  updateContactDetails as userUpdateContactDetails,
  getUserFromCode
} from '../auth'
import { utils } from '@tracktak/common'

const AuthContext = createContext()

/**
 *
 * @param children child components
 * @returns wrapped components provided with access to auth object
 */
export const ProvideAuth = props => {
  const auth = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  )
}

const getUpdatedUserDetails = (_, updatedUserDataArray) => {
  if (updatedUserDataArray) {
    const updatedUserData = updatedUserDataArray.reduce(
      (attributes, current) => ({
        ...attributes,
        [current.Name]: current.Value
      }),
      {}
    )
    const isEmailVerified = updatedUserData?.email_verified === 'true'

    return [updatedUserData, isEmailVerified]
  }

  return []
}

export const getUrlAuthParameters = () => {
  const params = new URLSearchParams(window.location.search)
  const challengeCode = params.get('challengeCode')
  const code = params.get('code') // This is for Federated Login e.g. with Google/Facebook.
  return {
    challengeCode,
    code
  }
}

/**
 *
 * Hook for managing authentication
 */
const useProvideAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [hasLoadedAuthDetails, setHasLoadedAuthDetails] = useState(false)
  const [userData, setUserData] = useState()
  const [isExternalIdentityProvider, setIsExternalIdentityProvider] =
    useState(false)

  const handleGetUserData = useCallback((...args) => {
    const [updatedUserData, isEmailVerified] = getUpdatedUserDetails(...args)

    setUserData(updatedUserData)
    setIsEmailVerified(isEmailVerified)

    if (updatedUserData.identities) {
      setIsExternalIdentityProvider(true)
    }
  }, [])

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true)
    getUserData(handleGetUserData)
    setHasLoadedAuthDetails(true)
  }, [handleGetUserData])

  const signIn = useCallback(
    (username, password, onSuccess, onFailure) => {
      const onCognitoSuccess = session => {
        handleLoginSuccess()
        onSuccess(session)
      }

      userSignIn(username, password, onCognitoSuccess, onFailure, utils.noop)
    },
    [handleLoginSuccess]
  )

  const signUp = useCallback(
    (email, password, userAttributes = [], onSuccess, onFailure) => {
      userSignUp(email, password, onSuccess, onFailure, userAttributes)
    },
    []
  )

  const signOut = useCallback(() => {
    userSignOut()
    setIsAuthenticated(false)
    setUserData(null)
    setIsExternalIdentityProvider(false)
  }, [])

  const resumeSession = useCallback(() => {
    const currentUser = getCurrentUser()

    if (currentUser) {
      currentUser.getSession((error, session) => {
        if (!error && session) {
          handleLoginSuccess()
        } else {
          signOut()
          setHasLoadedAuthDetails(true)
        }
      })
    } else {
      const hasAuthParameter =
        !!getUrlAuthParameters().challengeCode || !!getUrlAuthParameters().code
      setHasLoadedAuthDetails(!hasAuthParameter)
    }
  }, [handleLoginSuccess, signOut])

  const updateContactDetails = useCallback(
    (updatedAttributes, onSuccess, onFailure) => {
      const onUpdateSuccess = () => {
        if (
          updatedAttributes.email &&
          updatedAttributes.email !== userData.email
        ) {
          setIsEmailVerified(false)
        }
        onSuccess()
      }
      userUpdateContactDetails(updatedAttributes, onUpdateSuccess, onFailure)
    },
    [userData]
  )

  const sendChallengeAnswer = useCallback(
    (challengeAnswer, onSuccess, onFailure, onChallengeFailure) => {
      const handleVerificationSuccess = () => {
        resumeSession()
        utils.removeQueryParams()
        onSuccess()
      }
      const handleVerificationFailure = () => {
        utils.removeQueryParams()
        onFailure()
      }
      userSendChallengeAnswer(
        challengeAnswer,
        handleVerificationSuccess,
        handleVerificationFailure,
        onChallengeFailure
      )
    },
    [resumeSession]
  )

  const getAccessToken = useCallback(async () => {
    const session = await new Promise((resolve, reject) => {
      const currentUser = getCurrentUser()
      if (currentUser) {
        currentUser.getSession((error, session) => {
          if (!error && session) {
            resolve(session)
          } else {
            reject(error)
            signOut()
          }
        })
      } else {
        signOut()
      }
    })

    return session.accessToken
  }, [signOut])

  useEffect(() => {
    const signInWithFederatedLoginCode = async code => {
      await getUserFromCode(code)
      handleLoginSuccess()
      utils.removeQueryParams()
    }

    try {
      const code = getUrlAuthParameters()?.code
      if (code) {
        signInWithFederatedLoginCode(code)
      } else {
        resumeSession()
      }
    } catch (e) {
      signOut()
    }
  }, [handleLoginSuccess, resumeSession, signOut])

  return {
    isAuthenticated,
    hasLoadedAuthDetails,
    userData,
    isExternalIdentityProvider,
    signUp,
    signIn,
    signOut,
    isEmailVerified,
    sendEmailVerification,
    sendChallengeAnswer,
    changePassword,
    updateContactDetails,
    getAccessToken
  }
}

export const useAuth = () => {
  return useContext(AuthContext)
}
