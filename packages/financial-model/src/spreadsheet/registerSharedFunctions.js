import { HyperFormula } from '@tracktak/hyperformula'
import * as stockPlugin from './plugins/stock/plugin'
import * as bondPlugin from './plugins/bond/plugin'
import * as fxPlugin from './plugins/fx/plugin'
import * as marketPlugin from './plugins/market/plugin'
import * as helperPlugin from './plugins/helpers/plugin'
import * as statisticsPlugin from './plugins/statistics/plugin'

const registerSharedFunctions = dataGetter => {
  const plugins = [
    stockPlugin,
    bondPlugin,
    fxPlugin,
    marketPlugin,
    helperPlugin
  ]

  plugins.forEach(({ getPlugin, translations }) => {
    HyperFormula.registerFunctionPlugin(getPlugin(dataGetter), translations)
  })

  HyperFormula.registerFunctionPlugin(
    statisticsPlugin.Plugin,
    statisticsPlugin.translations
  )

  return plugins
}

export default registerSharedFunctions
