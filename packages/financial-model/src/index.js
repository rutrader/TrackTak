import FinancialSpreadsheet from './spreadsheet/FinancialSpreadsheet'
import templates from './spreadsheet/templates.json'
import * as helperPlugin from './spreadsheet/plugins/helpers/plugin'
import * as dataAnalysisPlugin from './spreadsheet/plugins/dataAnalysis/plugin'
import { HyperFormula } from '@tracktak/hyperformula'

HyperFormula.registerFunctionPlugin(
  helperPlugin.Plugin,
  helperPlugin.translations
)

HyperFormula.registerFunctionPlugin(
  dataAnalysisPlugin.Plugin,
  dataAnalysisPlugin.translations
)

export { templates, FinancialSpreadsheet }
