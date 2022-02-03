import React, { useEffect, useState } from 'react'
import { HyperFormula } from '@tracktak/hyperformula'
import { mapFromSerializedSheetsToSheets } from '@tracktak/powersheet'
import { Box } from '@mui/material'
import buildPowersheet from './buildPowersheet'
import registerSharedFunctions from './registerSharedFunctions'
import * as autocompletePlugin from './plugins/autocomplete/plugin'
import * as dataAnalysisPlugin from './plugins/dataAnalysis/plugin'

const FinancialSpreadsheet = ({ spreadsheetData, saveSheetData, sx }) => {
  const [spreadsheet, setSpreadsheet] = useState()
  const [containerEl, setContainerEl] = useState()
  const name = spreadsheetData?.sheetData.name

  useEffect(() => {
    const dataGetter = () => {
      let apiFrozenTimestamp

      if (!spreadsheetData.sheetData.data.data?.apiFrozenTimestamp) {
        apiFrozenTimestamp = undefined
      } else {
        apiFrozenTimestamp = spreadsheet.parseDynamicPattern(
          spreadsheetData.sheetData.data.data.apiFrozenTimestamp
        )
      }

      return {
        apiFrozenTimestamp,
        spreadsheetCreationDate: new Date(spreadsheetData.createdTimestamp),
        currentCellText: spreadsheet.sheets.cellEditor.currentCellText,
        spreadsheet
      }
    }

    const sheets = mapFromSerializedSheetsToSheets(
      spreadsheetData.sheetData.data.sheets
    )

    const powersheetPlugins = [autocompletePlugin, dataAnalysisPlugin]

    powersheetPlugins.forEach(({ getPlugin, translations }) => {
      HyperFormula.registerFunctionPlugin(getPlugin(dataGetter), translations)
    })

    const allPlugins = [
      ...powersheetPlugins,
      ...registerSharedFunctions(dataGetter)
    ]

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

      allPlugins.forEach(({ instance }) => {
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
