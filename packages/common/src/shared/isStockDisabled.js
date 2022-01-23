import { regions } from '../data/regions'

const isStockDisabled = (currentPlan, stock) => {
  if (process.env.PREMIUM_ENABLED === 'false') {
    return false
  }

  if (
    currentPlan?.priceIds.includes(regions.PriceIds.WORLDWIDE) ||
    (stock.exchange === 'US' && stock.isMediumCapUSPlus)
  ) {
    return false
  }
  if (stock.exchange === 'US' && !stock.isMediumCapUSPlus) {
    return !currentPlan?.priceIds.includes(regions.PriceIds.SMALL_CAP_US)
  }
  return !currentPlan?.priceIds.includes(
    regions.exchangeToPriceId[stock.exchange]
  )
}

export default isStockDisabled
