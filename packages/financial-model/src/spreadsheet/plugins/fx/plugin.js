import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import * as api from '@tracktak/common/src/api/api'
import currencyCodes from './currencyCodes'
import { baseCurrencyCellError, quoteCurrencyCellError } from './cellErrors'
import { getEodKeys, validateEODParamsHasError } from '../eod'
import {
  convertEODNumbersToFormattedNumbers,
  getPluginAsyncValue,
  inferSizeMethod,
  mapValuesToArrayOfArrays
} from '../helpers'

export const implementedFunctions = {
  'FX.GET_FIAT_EXCHANGE_RATE': {
    method: 'getFiatExchangeRate',
    arraySizeMethod: 'fxSize',
    inferReturnType: true,
    isAsyncMethod: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      {
        argumentType: ArgumentTypes.STRING
      },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  }
}

export const translations = {
  enGB: {
    'FX.GET_FIAT_EXCHANGE_RATE': 'FX.GET_FIAT_EXCHANGE_RATE'
  }
}

export const getPlugin = dataGetter => {
  class Plugin extends FunctionPlugin {
    getFiatExchangeRate(ast, state) {
      const metadata = this.metadata('FX.GET_FIAT_EXCHANGE_RATE')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (
          baseCurrency,
          quoteCurrency,
          field,
          granularity,
          fiscalDateRange
        ) => {
          const isBaseCurrencyValid = !!currencyCodes.find(
            x => x === baseCurrency
          )
          const isQuoteCurrencyValid = !!currencyCodes.find(
            x => x === quoteCurrency
          )
          const date = fiscalDateRange ?? dataGetter().apiFrozenTimestamp

          if (!isBaseCurrencyValid) {
            return baseCurrencyCellError
          }

          if (!isQuoteCurrencyValid) {
            return quoteCurrencyCellError
          }

          const error = validateEODParamsHasError(field, granularity, date)

          if (error) {
            return error
          }

          const { data } = await api.getExchangeRate(
            baseCurrency,
            quoteCurrency,
            {
              field,
              granularity,
              fiscalDateRange: date
            }
          )

          const eodKeys = getEodKeys('number')
          const value = mapValuesToArrayOfArrays(
            convertEODNumbersToFormattedNumbers(
              eodKeys,
              data.value,
              quoteCurrency
            ),
            true
          )

          return getPluginAsyncValue(value)
        }
      )
    }

    fxSize(ast, state) {
      return inferSizeMethod(ast, state)
    }
  }

  Plugin.implementedFunctions = implementedFunctions

  return Plugin
}
