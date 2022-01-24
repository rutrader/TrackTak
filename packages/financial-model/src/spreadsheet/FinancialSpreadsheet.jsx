import React, { useEffect, useState } from 'react'
import { HyperFormula } from '@tracktak/hyperformula'
import '@tracktak/powersheet/dist/index.css'
import {
  Spreadsheet,
  Toolbar,
  FormulaBar,
  Exporter,
  BottomBar,
  FunctionHelper,
  mapFromSerializedSheetsToSheets
} from '@tracktak/powersheet'
import getToolbarActionGroups from './getToolbarActionGroups'
import './FinancialSpreadsheet.css'
import { Box } from '@mui/material'
import plugins from './plugins'
import { config, namedExpressions } from './hyperformulaConfig'
import * as metaPlugin from './plugins/meta/plugin'
import tracktakFormulaMetadataJSON from '../tracktakFormulaMetadata.json'

plugins.forEach(value => {
  HyperFormula.registerFunctionPlugin(value.Plugin, value.translations)
})

const buildPowersheet = serializedSheets => {
  const sheets = mapFromSerializedSheetsToSheets(serializedSheets)
  const [hyperformula] = HyperFormula.buildFromSheets(
    sheets,
    config,
    namedExpressions
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
    const metaPluginInstance = metaPlugin.getPlugin(
      new Date(spreadsheetData.createdTimestamp)
    )

    HyperFormula.registerFunctionPlugin(
      metaPluginInstance,
      metaPlugin.translations
    )

    const spreadsheet = buildPowersheet(spreadsheetData.sheetData.data.sheets)

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

      HyperFormula.unregisterFunctionPlugin(metaPluginInstance)

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
      exportSpreadsheetName: `${name}.xlsx`
    }

    spreadsheet?.setOptions(options)
  }, [name, spreadsheet])

  return <Box sx={sx} ref={setContainerEl} />
}

export default FinancialSpreadsheet
