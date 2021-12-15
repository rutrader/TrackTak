import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { api } from '@tracktak/common'
import currencyCodes from './currencyCodes'
import { baseCurrencyCellError, quoteCurrencyCellError } from './cellErrors'
import { getEODParams, validateEODParamsHasError } from '../eod'
import { getFieldValue, sizeMethod } from '../helpers'

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

export const aliases = {
  'F.GFER': 'FX.GET_FIAT_EXCHANGE_RATE'
}

export const translations = {
  enGB: aliases
}

export class Plugin extends FunctionPlugin {
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

        if (!isBaseCurrencyValid) {
          return baseCurrencyCellError
        }

        if (!isQuoteCurrencyValid) {
          return quoteCurrencyCellError
        }

        const error = validateEODParamsHasError(
          field,
          granularity,
          fiscalDateRange
        )

        if (error) {
          return error
        }

        const params = getEODParams(granularity, field, fiscalDateRange)

        const { data } = await api.getExchangeRate(
          baseCurrency,
          quoteCurrency,
          params
        )

        return getFieldValue(data.value, true)
      }
    )
  }

  fxSize(_, state) {
    return sizeMethod(state)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
