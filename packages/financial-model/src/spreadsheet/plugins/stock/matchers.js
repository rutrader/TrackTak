import exchanges from './exchanges'

const exchangesString = exchanges.join('|')
const exchangesLowerString = exchanges.map(x => x.toLowerCase()).join('|')

export const tickerRegex = new RegExp(
  `^[0-9A-Za-z-]+\\.?(${exchangesString}|${exchangesLowerString})?$`
)
