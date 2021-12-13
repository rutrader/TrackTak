import exchanges from './exchanges'

const exchangesString = exchanges.join('|')

export const tickerRegex = new RegExp(
  `^[0-9A-Za-z-]+\\.?(${exchangesString})?$`
)
