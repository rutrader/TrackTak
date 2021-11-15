import AWS from 'aws-sdk'

const cognitoIssuerUri = process.env.COGNITO_ISSUER_URI
const region = process.env.REGION

const cup = new AWS.CognitoIdentityServiceProvider()
cup.config = new AWS.Config({
  region
})
cup.endpoint = new AWS.Endpoint(cognitoIssuerUri)

export const getUserDetails = async accessToken => {
  const user = await cup.getUser({ AccessToken: accessToken }).promise()
  return user.UserAttributes.reduce(
    (all, current) => ({
      ...all,
      [current.Name]: current.Value
    }),
    {}
  )
}
