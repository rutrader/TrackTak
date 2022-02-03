import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import getSymbolFromCurrency from 'currency-symbol-map'
import { currencyCodeCellError } from './cellErrors'
import { timeToNumber } from '../helpers'

export const implementedFunctions = {
  CONVERT_CURRENCY_CODE_TO_SYMBOL: {
    method: 'convertCurrencyCodeToSymbol',
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      }
    ]
  },
  SPREADSHEET_CREATION_DATE: {
    method: 'spreadsheetCreationDate',
    parameters: [],
    returnNumberType: 'NUMBER_DATETIME'
  }
}

export const translations = {
  enGB: {
    CONVERT_CURRENCY_CODE_TO_SYMBOL: 'CONVERT_CURRENCY_CODE_TO_SYMBOL',
    SPREADSHEET_CREATION_DATE: 'SPREADSHEET_CREATION_DATE'
  }
}

export const getPlugin = dataGetter => {
  class Plugin extends FunctionPlugin {
    convertCurrencyCodeToSymbol(ast, state) {
      const metadata = this.metadata('CONVERT_CURRENCY_CODE_TO_SYMBOL')

      return this.runFunction(ast.args, state, metadata, currencyCode => {
        const currencySymbol = getSymbolFromCurrency(currencyCode)

        if (!currencySymbol) {
          return currencyCodeCellError
        }

        return currencySymbol
      })
    }

    spreadsheetCreationDate(ast, state) {
      const metadata = this.metadata('SPREADSHEET_CREATION_DATE')

      return this.runFunction(ast.args, state, metadata, () => {
        const date = dataGetter().spreadsheetCreationDate

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

  return Plugin
}
