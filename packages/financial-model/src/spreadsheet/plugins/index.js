import * as stockFinancialsPlugin from './stock/financials/plugin'
import * as stockInfoPlugin from './stock/info/plugin'
import * as bondCountryPlugin from './bond/country/plugin'
import * as fxFiatPlugin from './fx/fiat/plugin'

const plugins = [
  stockFinancialsPlugin,
  stockInfoPlugin,
  bondCountryPlugin,
  fxFiatPlugin
]

export default plugins
