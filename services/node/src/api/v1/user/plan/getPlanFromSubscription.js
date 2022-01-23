import stripe from '../../../../shared/stripe'

const getPlanFromSubscription = async subscription => {
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

export default getPlanFromSubscription
