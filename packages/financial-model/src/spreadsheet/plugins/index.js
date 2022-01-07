import * as stockPlugin from './stock/plugin'
import * as bondPlugin from './bond/plugin'
import * as fxPlugin from './fx/plugin'
import * as metaPlugin from './meta/plugin'
import * as marketPlugin from './market/plugin'
import * as dataAnalysisPlugin from './dataAnalysis/plugin'
import * as statisticsPlugin from './statistics/plugin'

const plugins = [
  stockPlugin,
  bondPlugin,
  fxPlugin,
  metaPlugin,
  marketPlugin,
  dataAnalysisPlugin,
  statisticsPlugin
]

export default plugins
