const isStockDisabled = (currentPlan, stock) => {
  if (process.env.GATSBY_PREMIUM_ENABLED === 'false') {
    return false
  }

  if (
    currentPlan?.priceIds.includes(PriceIds.WORLDWIDE) ||
    (stock.exchange === 'US' && stock.isMediumCapUSPlus)
  ) {
    return false
  }
  if (stock.exchange === 'US' && !stock.isMediumCapUSPlus) {
    return !currentPlan?.priceIds.includes(PriceIds.SMALL_CAP_US)
  }
  return !currentPlan?.priceIds.includes(exchangeToPriceId[stock.exchange])
}

export default isStockDisabled
