import { getUserDetails } from '../../../../cognito/cognitoClient'
import stripe from '../../../../shared/stripe'

export const getCustomer = async accessToken => {
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

export const getPlanFromSubscription = async subscription => {
  if (subscription) {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      subscription.default_payment_method
    )

    const now = new Date().getTime() / 1000 // to seconds
    const isFrozen = !!(
      subscription.pause_collection &&
      now > subscription.metadata.period_end_at_freeze &&
      now <= subscription.pause_collection.resumes_at
    )

    return {
      periodEnd: isFrozen
        ? subscription.pause_collection.resumes_at * 1000
        : subscription.current_period_end * 1000, // to ms
      priceIds: isFrozen ? [] : subscription.items.data.map(x => x.price.id),
      totalCost:
        subscription.items.data.reduce(
          (sum, x) => (sum += x.price.unit_amount),
          0
        ) / 100,
      paymentCardLast4: paymentMethod && paymentMethod.card.last4,
      paymentCardBrand: paymentMethod && paymentMethod.card.brand,
      isFrozen
    }
  }

  return {
    priceIds: [],
    isFrozen: false
  }
}

export const getSubscription = async stripeCustomerId => {
  const customer = await stripe.customers.retrieve(stripeCustomerId, {
    expand: ['subscriptions']
  })
  return (
    customer.subscriptions.data.length > 0 && customer.subscriptions.data[0]
  )
}
