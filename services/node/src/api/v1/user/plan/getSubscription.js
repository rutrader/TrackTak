import stripe from '../../../../shared/stripe'

const getSubscription = async stripeCustomerId => {
  const customer = await stripe.customers.retrieve(stripeCustomerId, {
    expand: ['subscriptions']
  })
  return (
    customer.subscriptions.data.length > 0 && customer.subscriptions.data[0]
  )
}

export default getSubscription
