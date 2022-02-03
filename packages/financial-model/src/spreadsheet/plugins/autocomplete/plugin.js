import { FunctionPlugin } from '@tracktak/hyperformula'
import * as api from '@tracktak/common/src/api/api'
import { inferSizeMethod } from '../helpers'

export const implementedFunctions = {
  'AUTOCOMPLETE.STOCK_SEARCH': {
    method: 'stockSearch',
    arraySizeMethod: 'autocompleteSize',
    isAsyncMethod: true,
    inferReturnType: true,
    parameters: []
  }
}

export const translations = {
  enGB: {
    'AUTOCOMPLETE.STOCK_SEARCH': 'AUTOCOMPLETE.STOCK_SEARCH'
  }
}

export const getPlugin = dataGetter => {
  class Plugin extends FunctionPlugin {
    stockSearch(ast, state) {
      const metadata = this.metadata('AUTOCOMPLETE.STOCK_SEARCH')

      return this.runAsyncFunction(ast.args, state, metadata, async () => {
        const { data } = await api.getSecuritiesAutocomplete(
          dataGetter().currentCellText,
          {
            type: 'stock'
          }
        )

        return data.value.map(({ name, code, exchange }) => {
          const ticker = `${code}.${exchange}`

          return {
            label: `${name} (${ticker})`,
            value: ticker
          }
        })
      })
    }

    autocompleteSize(ast, state) {
      return inferSizeMethod(ast, state)
    }
  }

  Plugin.implementedFunctions = implementedFunctions

  return Plugin
}
