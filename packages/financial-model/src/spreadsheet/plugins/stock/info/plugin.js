import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { tickerCellError } from '../cellErrors'
import { tickerRegex } from '../matchers'
import { api } from '@tracktak/common'
import fields from './fields'
import { getFieldValue, sizeMethod } from '../../helpers'
import { getFieldCellError } from '../../cellErrors'

const fieldCellError = getFieldCellError(fields)

export const implementedFunctions = {
  'STOCK.INFO': {
    method: 'info',
    arraySizeMethod: 'infoSize',
    isAsyncMethod: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      {
        argumentType: ArgumentTypes.STRING
      }
    ]
  }
}

export const aliases = {
  'S.INFO': 'STOCK.INFO'
}

export const translations = {
  enGB: {
    'S.INFO': 'STOCK.INFO'
  }
}

export class Plugin extends FunctionPlugin {
  info(ast, state) {
    const metadata = this.metadata('STOCK.INFO')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (ticker, field) => {
        const isTickerValid = !!ticker.match(tickerRegex)
        const isFieldValid = fields.find(x => x === field)

        if (!isTickerValid) {
          return tickerCellError
        }

        if (!isFieldValid) {
          return fieldCellError
        }

        const { data } = await api.getFundamentals(ticker, {
          filter: 'General,SharesStats,Highlights'
        })
        const info = {
          ...data.value.general,
          ...data.value.sharesStats,
          ...data.value.highlights
        }

        return getFieldValue(info[field])
      }
    )
  }
  infoSize(_, state) {
    return sizeMethod(state)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
