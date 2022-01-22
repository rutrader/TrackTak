import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import getSymbolFromCurrency from 'currency-symbol-map'
import { currencyCodeCellError } from './cellErrors'

export const implementedFunctions = {
  CONVERT_CURRENCY_CODE_TO_SYMBOL: {
    method: 'convertCurrencyCodeToSymbol',
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      }
    ]
  }
}

export const translations = {
  enGB: {
    CONVERT_CURRENCY_CODE_TO_SYMBOL: 'CONVERT_CURRENCY_CODE_TO_SYMBOL'
  }
}

export class Plugin extends FunctionPlugin {
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
}

Plugin.implementedFunctions = implementedFunctions
