import * as stockPlugin from './stock/plugin'
import * as bondPlugin from './bond/plugin'
import * as fxPlugin from './fx/plugin'
import * as marketPlugin from './market/plugin'
import * as dataAnalysisPlugin from './dataAnalysis/plugin'
import * as statisticsPlugin from './statistics/plugin'
import * as helpersPlugin from './helpers/plugin'

const plugins = [
  stockPlugin,
  bondPlugin,
  helpersPlugin,
  fxPlugin,
  marketPlugin,
  dataAnalysisPlugin,
  statisticsPlugin
]

export default plugins
