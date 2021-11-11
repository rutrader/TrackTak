import companiesInterestSpreads from './companiesInterestSpreads'

const thresholdMarketCapUSD = 5000000000

const getInterestSpread = (
  fundamentals,
  interestCoverage,
  lastExchangeRate
) => {
  const thresholdMarketCap = thresholdMarketCapUSD * lastExchangeRate
  const isLargeCompany =
    fundamentals.highlights.marketCapitalization >= thresholdMarketCap

  const findCurrentSpread = key => {
    return companiesInterestSpreads.find(spread => {
      const parsedFrom = parseFloat(spread[key].from)
      const parsedTo = parseFloat(spread[key].to)

      return interestCoverage >= parsedFrom && interestCoverage <= parsedTo
    })
  }

  return isLargeCompany
    ? findCurrentSpread('large')
    : findCurrentSpread('small')
}

export default getInterestSpread
