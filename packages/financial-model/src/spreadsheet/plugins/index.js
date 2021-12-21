import * as stockPlugin from './stock/plugin'
import * as bondPlugin from './bond/plugin'
import * as fxPlugin from './fx/plugin'
import * as metaPlugin from './meta/plugin'
import * as marketPlugin from './market/plugin'
import * as dataAnalysisPlugin from './dataAnalysis/plugin'

const plugins = [
  stockPlugin,
  bondPlugin,
  fxPlugin,
  metaPlugin,
  marketPlugin,
  dataAnalysisPlugin
]

export default plugins
