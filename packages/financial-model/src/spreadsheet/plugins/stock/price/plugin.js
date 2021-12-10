import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { api } from '@tracktak/common'
import { getEODParams, validateEODParamsHasError } from '../../eod'
import { getFieldValue, sizeMethod } from '../../helpers'
import { tickerRegex } from '../matchers'
import { tickerCellError } from '../cellErrors'

export const implementedFunctions = {
  'STOCK.PRICE': {
    method: 'price',
    arraySizeMethod: 'priceSize',
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
  'S.PRICE': 'STOCK.PRICE'
}

export const translations = {
  enGB: {
    'S.PRICE': 'STOCK.PRICE'
  }
}

export class Plugin extends FunctionPlugin {
  price(ast, state) {
    const metadata = this.metadata('STOCK.PRICE')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (ticker, field, granularity, fiscalDateRange) => {
        const isTickerValid = !!ticker.match(tickerRegex)

        const error = validateEODParamsHasError(
          field,
          granularity,
          fiscalDateRange
        )

        if (!isTickerValid) {
          return tickerCellError
        }

        if (error) {
          return error
        }

        const params = getEODParams(granularity, field, fiscalDateRange)

        const { data } = await api.getEOD(ticker, params)

        return getFieldValue(data.value, true)
      }
    )
  }

  priceSize(_, state) {
    return sizeMethod(state)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
