import React, { useEffect, useState } from 'react'
import { HyperFormula } from '@tracktak/hyperformula'
import '@tracktak/powersheet/dist/index.css'
import {
  Spreadsheet,
  Toolbar,
  FormulaBar,
  BottomBar,
  FunctionHelper,
  mapFromSerializedSheetsToSheets
} from '@tracktak/powersheet'
import getToolbarActionGroups from './getToolbarActionGroups'
import './FinancialSpreadsheet.css'
import { Box } from '@mui/material'
import { config, namedExpressions } from './hyperformulaConfig'
import tracktakFormulaMetadataJSON from '../tracktakFormulaMetadata.json'
import * as stockPlugin from './plugins/stock/plugin'
import * as bondPlugin from './plugins/bond/plugin'
import * as fxPlugin from './plugins/fx/plugin'
import * as marketPlugin from './plugins/market/plugin'
import * as helperPlugin from './plugins/helpers/plugin'
import * as autocompletePlugin from './plugins/autocomplete/plugin'
import * as dataAnalysisPlugin from './plugins/dataAnalysis/plugin'

const buildPowersheet = sheets => {
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

  const functionHelper = new FunctionHelper()
  const toolbar = new Toolbar()
  const formulaBar = new FormulaBar()
  const bottomBar = new BottomBar()

  const spreadsheet = new Spreadsheet({
    hyperformula,
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

const FinancialSpreadsheet = ({ spreadsheetData, saveSheetData, sx }) => {
  const [spreadsheet, setSpreadsheet] = useState()
  const [containerEl, setContainerEl] = useState()
  const name = spreadsheetData?.sheetData.name

  useEffect(() => {
    const getApiFrozenTimestamp = () => {
      if (!spreadsheetData.sheetData.data.data?.apiFrozenTimestamp) {
        return undefined
      }

      return spreadsheet.parseDynamicPattern(
        spreadsheetData.sheetData.data.data.apiFrozenTimestamp
      )
    }

    const getAutocompleteInput = () => {
      return spreadsheet.sheets.cellEditor.currentCellText
    }

    const getPowersheet = () => spreadsheet

    const plugins = [
      {
        instance: stockPlugin.getPlugin(getApiFrozenTimestamp),
        translations: stockPlugin.translations
      },
      {
        instance: bondPlugin.getPlugin(getApiFrozenTimestamp),
        translations: bondPlugin.translations
      },
      {
        instance: fxPlugin.getPlugin(getApiFrozenTimestamp),
        translations: fxPlugin.translations
      },
      {
        instance: marketPlugin.getPlugin(getApiFrozenTimestamp),
        translations: marketPlugin.translations
      },
      {
        instance: helperPlugin.getPlugin(
          new Date(spreadsheetData.createdTimestamp)
        ),
        translations: helperPlugin.translations
      },
      {
        instance: autocompletePlugin.getPlugin(getAutocompleteInput),
        translations: autocompletePlugin.translations
      }
    ]

    if (process.env.ENABLE_DATA_ANALYSIS === 'true') {
      plugins.push({
        instance: dataAnalysisPlugin.getPlugin(getPowersheet),
        translations: dataAnalysisPlugin.translations
      })
    }

    plugins.forEach(({ instance, translations }) => {
      HyperFormula.registerFunctionPlugin(instance, translations)
    })

    const sheets = mapFromSerializedSheetsToSheets(
      spreadsheetData.sheetData.data.sheets
    )

    const spreadsheet = buildPowersheet(sheets)

    spreadsheet.hyperformula.batch(() => {
      for (const sheetName in sheets) {
        const sheet = sheets[sheetName]
        const sheetId = spreadsheet.hyperformula.getSheetId(sheetName)

        spreadsheet.hyperformula.setSheetContent(sheetId, sheet.cells)
      }
    })

    spreadsheet.hyperformula.clearUndoStack()
    spreadsheet.render()

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

    spreadsheet.setData(spreadsheetData.sheetData.data.data)

    const functionHelperClosed = localStorage.getItem('functionHelperClosed')

    if (functionHelperClosed !== 'true') {
      // TODO: Figure out why setTimeout needed
      // raise an issue with material components
      setTimeout(() => {
        spreadsheet.setOptions({
          showFunctionHelper: true
        })
      }, 500)
    }

    return () => {
      spreadsheet.functionHelper.closeButton.removeEventListener(
        'click',
        clickEventListener
      )
      spreadsheet.toolbar.iconElementsMap.functionHelper.buttonContainer.removeEventListener(
        'click',
        clickEventListener
      )

      plugins.forEach(({ instance }) => {
        HyperFormula.unregisterFunctionPlugin(instance)
      })

      spreadsheet.destroy()
    }
  }, [spreadsheetData])

  useEffect(() => {
    const persistData = async (data, done) => {
      await saveSheetData(data)

      done()
    }

    spreadsheet?.eventEmitter.on('persistData', persistData)

    return () => {
      spreadsheet?.eventEmitter.off('persistData', persistData)
    }
  }, [saveSheetData, spreadsheet])

  useEffect(() => {
    if (containerEl) {
      containerEl.appendChild(spreadsheet.spreadsheetEl)

      spreadsheet.updateSize()
    }
  }, [containerEl, spreadsheet])

  useEffect(() => {
    const options = {
      textPatternFormats: {
        dollar: '$#,##0.##',
        euro: '€#,##0.##',
        pound: '£#,##0.##'
      }
    }

    spreadsheet?.setOptions(options)
  }, [name, spreadsheet])

  return <Box sx={sx} ref={setContainerEl} />
}

export default FinancialSpreadsheet
