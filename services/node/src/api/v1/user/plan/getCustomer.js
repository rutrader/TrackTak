import { getUserDetails } from '../../../../cognito/cognitoClient'
import stripe from '../../../../shared/stripe'

const getCustomer = async accessToken => {
  const userDetails = await getUserDetails(accessToken)
  if (!userDetails || !userDetails.email) {
    return null
  }
  const customers = await stripe.customers.list({
    limit: 1,
    email: userDetails.email
  })
  return customers.data.length > 0
    ? customers.data[0]
    : { email: userDetails.email }
}

export default getCustomer
