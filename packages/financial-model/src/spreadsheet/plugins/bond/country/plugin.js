import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { api } from '@tracktak/common'
import { getFieldValue, sizeMethod } from '../../helpers'
import countryCodes from './countryCodes'
import { countryCodeCellError, maturityCellError } from './cellErrors'
import { maturityRegex } from './matchers'
import { getEODParams, validateEODParamsHasError } from '../../eod'

export const implementedFunctions = {
  'BOND.GET_COUNTRY_YIELD': {
    method: 'getCountryYield',
    arraySizeMethod: 'getCountryYieldSize',
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
  'B.GCY': 'BOND.GET_COUNTRY_YIELD'
}

export const translations = {
  enGB: {
    'B.GCY': 'BOND.GET_COUNTRY_YIELD'
  }
}

export class Plugin extends FunctionPlugin {
  getCountryYield(ast, state) {
    const metadata = this.metadata('BOND.GET_COUNTRY_YIELD')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (countryCode, maturity, field, granularity, fiscalDateRange) => {
        const isCountryCodeValid = !!countryCodes.find(x => x === countryCode)
        const isMaturityValidValid = !!maturity.match(maturityRegex)

        const error = validateEODParamsHasError(
          field,
          granularity,
          fiscalDateRange
        )

        if (error) {
          return error
        }

        if (!isCountryCodeValid) {
          return countryCodeCellError
        }

        if (!isMaturityValidValid) {
          return maturityCellError
        }

        const maturityGranularity = [...maturity.matchAll(maturityRegex)][0][1]

        let formattedMaturity = parseInt(maturity, 10)

        if (maturityGranularity === 'yr') {
          formattedMaturity += 'Y'
        } else {
          formattedMaturity += 'M'
        }

        const params = getEODParams(granularity, field, fiscalDateRange)

        const { data } = await api.getGovernmentBond(
          `${countryCode}${formattedMaturity}`,
          params
        )

        return getFieldValue(data.value, true)
      }
    )
  }

  getCountryYieldSize(_, state) {
    return sizeMethod(state)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
