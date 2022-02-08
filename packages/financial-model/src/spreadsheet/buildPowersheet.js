import { HyperFormula } from '@tracktak/hyperformula'
import '@tracktak/powersheet/dist/index.css'
import './spreadsheet.css'
import {
  Spreadsheet,
  Toolbar,
  FormulaBar,
  BottomBar,
  FunctionHelper,
  Exporter
} from '@tracktak/powersheet'
import getToolbarActionGroups from './getToolbarActionGroups'
import { config, namedExpressions } from './hyperformulaConfig'
import tracktakFormulaMetadataJSON from '../tracktakFormulaMetadata.json'

const buildPowersheet = (sheets, plugins) => {
  const sheetsMetadata = {}

  for (const sheetName in sheets) {
    const { sheetMetadata } = sheets[sheetName]

    sheetsMetadata[sheetName] = {
      cells: [],
      sheetMetadata
    }
  }

  const [hyperformula] = HyperFormula.buildFromSheets(
    sheetsMetadata,
    config,
    namedExpressions
  )
  const exporter = new Exporter(plugins)
  const functionHelper = new FunctionHelper()
  const toolbar = new Toolbar()
  const formulaBar = new FormulaBar()
  const bottomBar = new BottomBar()

  const spreadsheet = new Spreadsheet({
    hyperformula,
    exporter,
    toolbar,
    formulaBar,
    bottomBar,
    functionHelper
  })

  spreadsheet.setFunctionTypeBlocklist(['Engineering'])
  spreadsheet.setCustomFunctionMetadata(tracktakFormulaMetadataJSON)
  spreadsheet.spreadsheetEl.prepend(formulaBar.formulaBarEl)
  spreadsheet.spreadsheetEl.prepend(toolbar.toolbarEl)
  spreadsheet.spreadsheetEl.appendChild(bottomBar.bottomBarEl)
  spreadsheet.sheets.sheetElContainer.appendChild(
    functionHelper.functionHelperEl
  )

  functionHelper.setDrawerContent()
  toolbar.setToolbarIcons(getToolbarActionGroups(toolbar))

  return spreadsheet
}

export default buildPowersheet
