import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { timeToNumber } from '../helpers'
import { tickerCellError } from '../stock/cellErrors'
import { tickerRegex } from '../stock/matchers'
import { api } from '@tracktak/common'
import convertSubCurrencyToCurrency from '../convertSubCurrencyToCurrency'
import getSymbolFromCurrency, { currencySymbolMap } from 'currency-symbol-map'

export const implementedFunctions = {
  SPREADSHEET_CREATION_DATE: {
    method: 'spreadsheetCreationDate',
    parameters: [],
    returnNumberType: 'NUMBER_DATETIME'
  },
  INTERNAL_SET_SPREADSHEET_CURRENCY: {
    method: 'internalSetSpreadsheetCurrency',
    isAsyncMethod: true,
    inferReturnType: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      }
    ]
  }
}

export const aliases = {
  SCD: 'SPREADSHEET_CREATION_DATE'
}

export const translations = {
  enGB: {
    SCD: 'SPREADSHEET_CREATION_DATE',
    INTERNAL_SET_SPREADSHEET_CURRENCY: 'INTERNAL_SET_SPREADSHEET_CURRENCY'
  }
}

export class Plugin extends FunctionPlugin {
  setSpreadsheetCreationDate(creationDate) {
    this.creationDate = creationDate
  }

  setSpreadsheet(spreadsheet) {
    this.spreadsheet = spreadsheet
  }

  // TODO: Remove when we have conditional currency formatting
  internalSetSpreadsheetCurrency(ast, state) {
    const metadata = this.metadata('INTERNAL_SET_SPREADSHEET_CURRENCY')

    return this.runAsyncFunction(ast.args, state, metadata, async ticker => {
      const isTickerValid = !!ticker.match(tickerRegex)

      if (!isTickerValid) {
        return tickerCellError
      }

      const { data } = await api.getEODHistoricalDataFundamentals(ticker, {
        filter: 'General::CurrencyCode'
      })

      const mainCurrencyCode = convertSubCurrencyToCurrency(data.value)

      const currencySymbol = getSymbolFromCurrency(mainCurrencyCode)

      Object.keys(this.spreadsheet.data._spreadsheetData.cells).forEach(key => {
        const cellData = this.spreadsheet.data._spreadsheetData.cells[key]

        if (cellData.dynamicFormat === 'currency') {
          const oldCurrencySymbol = cellData.textFormatPattern.charAt(0)
          const hasCurrencySymbol = Object.values(currencySymbolMap).some(
            x => x === oldCurrencySymbol
          )

          const newTextFormatPatternPart = hasCurrencySymbol
            ? cellData.textFormatPattern.slice(1)
            : cellData.textFormatPattern

          this.spreadsheet.data._spreadsheetData.cells[key].textFormatPattern =
            `"${currencySymbol}"` + newTextFormatPatternPart
        }
      })

      this.spreadsheet.setOptions({
        textPatternFormats: {
          currency: `"${currencySymbol}"#,##0.##`,
          'million-currency': `"${currencySymbol}"#,###.##,,`
        }
      })

      return '@@internalFunction'
    })
  }

  spreadsheetCreationDate(ast, state) {
    const metadata = this.metadata('SPREADSHEET_CREATION_DATE')

    return this.runFunction(ast.args, state, metadata, () => {
      const date = this.creationDate

      return (
        timeToNumber({
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds()
        }) +
        this.dateTimeHelper.dateToNumber({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        })
      )
    })
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
