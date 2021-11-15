const getIsLargeCompany = (fundamentals, thresholdMarketCap) => {
  return fundamentals.highlights.marketCapitalization >= thresholdMarketCap
}

export default getIsLargeCompany
