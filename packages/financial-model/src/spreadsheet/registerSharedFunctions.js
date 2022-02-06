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
  ].map(({ getPlugin, translations }) => {
    return {
      plugin: getPlugin(dataGetter),
      translations
    }
  })

  plugins.push({
    plugin: statisticsPlugin.Plugin,
    translations: statisticsPlugin.translations
  })

  plugins.forEach(({ plugin, translations }) => {
    HyperFormula.registerFunctionPlugin(plugin, translations)
  })

  return plugins
}

export default registerSharedFunctions
