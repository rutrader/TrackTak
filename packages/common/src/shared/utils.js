export const noop = () => {}

export const trackingFormatDate = 'DD/MM/YYYY HH:mm'

export const resourceName = 'https://tracktak.com'

export const getTitle = title => {
  return `${title} | tracktak.com`
}

export const replaceSpaceWithHyphen = str => str.replace(/\s/g, '-')

export const removeQueryParams = () => {
  window.history.replaceState(
    null,
    '',
    '/' +
      window.location.href
        .substring(window.location.href.lastIndexOf('/') + 1)
        .split('?')[0]
  )
}

export const convertSubCurrencyToCurrency = currencyCode => {
  if (currencyCode === 'ILA') {
    return 'ILS'
  }
  if (currencyCode === 'GBX') {
    return 'GBP'
  }
  return currencyCode
}

export const formatPrice = ({ unitAmount, currency }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol'
  })
  const parts = numberFormat.formatToParts(unitAmount)
  let zeroDecimalCurrency = true
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  unitAmount = zeroDecimalCurrency ? unitAmount : unitAmount / 100
  const total = unitAmount?.toFixed(2)
  return numberFormat.format(total)
}
