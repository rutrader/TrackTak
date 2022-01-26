import FinancialSpreadsheet from './spreadsheet/FinancialSpreadsheet'
import templates from './spreadsheet/templates.json'
import * as dataAnalysisPlugin from './spreadsheet/plugins/dataAnalysis/plugin'
import { HyperFormula } from '@tracktak/hyperformula'

HyperFormula.registerFunctionPlugin(
  dataAnalysisPlugin.Plugin,
  dataAnalysisPlugin.translations
)

export { templates, FinancialSpreadsheet }
