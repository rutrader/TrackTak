import stockExchanges from './stockExchanges'

const exchangesString = stockExchanges.join('|')
const dateFormatString = '([0-9]{4}/[0-9]{2}(/[0-9]{2})?)'

export const tickerRegex = new RegExp(
  `^[0-9A-Za-z-]+\\.?(${exchangesString})?$`
)
export const fiscalDateRangeRegex = new RegExp(
  `(^(>|<)${dateFormatString}$)|(^${dateFormatString};${dateFormatString}$)`
)
