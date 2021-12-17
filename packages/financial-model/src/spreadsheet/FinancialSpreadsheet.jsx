import React, { useEffect, useState } from 'react'
import { AlwaysSparse, HyperFormula } from '@tracktak/hyperformula'
import '@tracktak/powersheet/dist/index.css'
import {
  Spreadsheet,
  Toolbar,
  FormulaBar,
  Exporter,
  BottomBar,
  FunctionHelper
} from '@tracktak/powersheet'
import { currencySymbolMap } from 'currency-symbol-map'
import getToolbarActionGroups from './getToolbarActionGroups'
import getFunctionHelperContent from './getFunctionHelperContent'
import './FinancialSpreadsheet.css'
import { Box } from '@mui/material'
import plugins from './plugins'

plugins.forEach(value => {
  HyperFormula.registerFunctionPlugin(value.Plugin, value.translations)
})

const buildPowersheet = () => {
  const trueNamedExpression = {
    name: 'TRUE',
    expression: '=TRUE()'
  }

  const falseNamedExpression = {
    name: 'FALSE',
    expression: '=FALSE()'
  }

  const [hyperformula] = HyperFormula.buildEmpty(
    {
      chooseAddressMappingPolicy: new AlwaysSparse(),
      // We use our own undo/redo instead
      undoLimit: 0,
      timeoutTime: 10000,
      licenseKey: 'gpl-v3'
    },
    [trueNamedExpression, falseNamedExpression]
  )

  const functionHelper = new FunctionHelper()
  const toolbar = new Toolbar()
  const formulaBar = new FormulaBar()
  const exporter = new Exporter(plugins)
  const bottomBar = new BottomBar()

  const spreadsheet = new Spreadsheet({
    hyperformula,
    toolbar,
    formulaBar,
    exporter,
    bottomBar,
    functionHelper,
    hyperformulaConfig: {
      currencySymbol: Object.values(currencySymbolMap)
    }
  })

  spreadsheet.spreadsheetEl.prepend(formulaBar.formulaBarEl)
  spreadsheet.spreadsheetEl.prepend(toolbar.toolbarEl)
  spreadsheet.spreadsheetEl.appendChild(bottomBar.bottomBarEl)
  spreadsheet.sheets.sheetElContainer.appendChild(
    functionHelper.functionHelperEl
  )

  functionHelper.setDrawerContent(getFunctionHelperContent())
  toolbar.setToolbarIcons(getToolbarActionGroups(toolbar))

  return spreadsheet
}

const FinancialSpreadsheet = ({ spreadsheetData, saveSheetData, sx }) => {
  const [spreadsheet, setSpreadsheet] = useState()
  const [containerEl, setContainerEl] = useState()
  const name = spreadsheetData?.sheetData.name

  useEffect(() => {
    const spreadsheet = buildPowersheet()

    setSpreadsheet(spreadsheet)

    const clickEventListener = () => {
      if (spreadsheet.functionHelper.drawer.open) {
        localStorage.setItem('functionHelperClosed', 'true')
      }
    }

    spreadsheet.functionHelper.closeButton.addEventListener(
      'click',
      clickEventListener
    )

    spreadsheet.toolbar.iconElementsMap.functionHelper.buttonContainer.addEventListener(
      'click',
      clickEventListener
    )

    return () => {
      spreadsheet?.destroy()
      spreadsheet.functionHelper.closeButton.removeEventListener(
        'click',
        clickEventListener
      )
      spreadsheet.toolbar.iconElementsMap.functionHelper.buttonContainer.removeEventListener(
        'click',
        clickEventListener
      )
    }
  }, [])

  useEffect(() => {
    const persistData = async (data, done) => {
      await saveSheetData({ data })

      done()
    }

    spreadsheet?.eventEmitter.on('persistData', persistData)

    return () => {
      spreadsheet?.eventEmitter.off('persistData', persistData)
    }
  }, [saveSheetData, spreadsheet])

  useEffect(() => {
    if (spreadsheet) {
      if (containerEl) {
        containerEl.appendChild(spreadsheet.spreadsheetEl)
      }

      if (spreadsheetData) {
        const metaPlugin =
          spreadsheet.hyperformula._evaluator.interpreter.functionRegistry.functions.get(
            'SPREADSHEET_CREATION_DATE'
          )[1]

        metaPlugin.setSpreadsheetCreationDate(
          new Date(spreadsheetData.createdTimestamp)
        )
        metaPlugin.setSpreadsheet(spreadsheet)

        spreadsheet.setData(spreadsheetData.sheetData.data)

        const functionHelperClosed = localStorage.getItem(
          'functionHelperClosed'
        )

        if (functionHelperClosed !== 'true') {
          // TODO: Figure out why setTimeout needed
          // raise an issue with material components
          setTimeout(() => {
            spreadsheet?.setOptions({
              showFunctionHelper: true
            })
          }, 500)
        }
      }
    }
  }, [containerEl, spreadsheetData, spreadsheet])

  useEffect(() => {
    const options = {
      exportSpreadsheetName: `${name}.xlsx`,
      textPatternFormats: {
        million: '#,###.##,,'
      }
    }

    spreadsheet?.setOptions(options)
  }, [name, spreadsheet])

  if (!spreadsheet) return null

  return <Box sx={sx} ref={setContainerEl} />
}

export default FinancialSpreadsheet
