const convertSubCurrencyToCurrency = currencyCode => {
  if (currencyCode === 'ILA') {
    return 'ILS'
  }
  if (currencyCode === 'GBX') {
    return 'GBP'
  }
  return currencyCode
}

export default convertSubCurrencyToCurrency
