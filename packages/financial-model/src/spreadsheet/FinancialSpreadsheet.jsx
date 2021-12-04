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
import {
  translations,
  getPlugin,
  aliases,
  implementedFunctions
} from './plugins/stockFinancials/getPlugin'
import getToolbarActionGroups from './getToolbarActionGroups'
import getFunctionHelperContent from './getFunctionHelperContent'
import './FinancialSpreadsheet.css'
import { Box } from '@mui/material'

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
      licenseKey: 'gpl-v3'
    },
    [trueNamedExpression, falseNamedExpression]
  )

  const functionHelper = new FunctionHelper()
  const toolbar = new Toolbar()
  const formulaBar = new FormulaBar()
  const exporter = new Exporter([
    {
      implementedFunctions,
      aliases
    }
  ])
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

  toolbar.setToolbarIcons(getToolbarActionGroups(toolbar))

  return spreadsheet
}

const FinancialSpreadsheet = ({
  sheetData,
  financialData,
  saveSheetData,
  sx
}) => {
  const [spreadsheet, setSpreadsheet] = useState()
  const [containerEl, setContainerEl] = useState()
  const currencySymbol = financialData?.general?.currencySymbol
  const name = sheetData?.name

  useEffect(() => {
    const FinancialPlugin = getPlugin(financialData)

    HyperFormula.registerFunctionPlugin(FinancialPlugin, translations)

    if (financialData) {
      spreadsheet?.render(true)
    }

    return () => {
      HyperFormula.unregisterFunctionPlugin(FinancialPlugin)
    }
  }, [financialData, spreadsheet])

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
    const setTicker = async ticker => {
      await saveSheetData({
        financialData: {
          ticker
        }
      })
    }

    spreadsheet?.functionHelper.setDrawerContent(
      getFunctionHelperContent(setTicker)
    )
  }, [spreadsheet, saveSheetData])

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

      if (sheetData) {
        spreadsheet.setData(sheetData.data)
        spreadsheet.initialize()

        const functionHelperClosed = localStorage.getItem(
          'functionHelperClosed'
        )

        if (sheetData.data && functionHelperClosed !== 'true') {
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
  }, [containerEl, sheetData, spreadsheet])

  useEffect(() => {
    const options = {
      exportSpreadsheetName: `${name}.xlsx`,
      textPatternFormats: {
        currency: `${currencySymbol}#,##0.##`,
        million: '#,###.##,,',
        'million-currency': `${currencySymbol}#,###.##,,`
      }
    }

    spreadsheet?.setOptions(options)
  }, [currencySymbol, name, spreadsheet])

  if (!spreadsheet) return null

  return <Box sx={sx} ref={setContainerEl} />
}

export default FinancialSpreadsheet
