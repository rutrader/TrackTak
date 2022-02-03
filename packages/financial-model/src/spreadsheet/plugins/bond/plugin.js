import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import * as api from '@tracktak/common/src/api/api'
import {
  convertEODNumbersToFormattedNumbers,
  getPluginAsyncValue,
  inferSizeMethod,
  mapValuesToArrayOfArrays
} from '../helpers'
import countryISOs from './countryISOs'
import { maturityCellError } from './cellErrors'
import { maturityRegex } from './matchers'
import { getEodKeys, validateEODParamsHasError } from '../eod'
import { getCountryISOCellError } from '../cellErrors'

const countryISOCellError = getCountryISOCellError(countryISOs)

export const implementedFunctions = {
  'BOND.GET_COUNTRY_YIELD': {
    method: 'getCountryYield',
    arraySizeMethod: 'bondSize',
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
    'BOND.GET_COUNTRY_YIELD': 'BOND.GET_COUNTRY_YIELD'
  }
}

export const getPlugin = dataGetter => {
  class Plugin extends FunctionPlugin {
    getCountryYield(ast, state) {
      const metadata = this.metadata('BOND.GET_COUNTRY_YIELD')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (countryISO, maturity, field, granularity, fiscalDateRange) => {
          const isCountryISOValid = !!countryISOs.find(x => x === countryISO)
          const isMaturityValidValid = !!maturity.match(maturityRegex)
          const date = fiscalDateRange ?? dataGetter().apiFrozenTimestamp

          const error = validateEODParamsHasError(field, granularity, date)

          if (error) {
            return error
          }

          if (!isCountryISOValid) {
            return countryISOCellError
          }

          if (!isMaturityValidValid) {
            return maturityCellError
          }

          const maturityGranularity = [
            ...maturity.matchAll(maturityRegex)
          ][0][1]

          let formattedMaturity = parseInt(maturity, 10)

          if (maturityGranularity === 'yr') {
            formattedMaturity += 'Y'
          } else {
            formattedMaturity += 'M'
          }

          const { data } = await api.getGovernmentBond(
            `${countryISO}${formattedMaturity}`,
            {
              field,
              granularity,
              fiscalDateRange: date
            }
          )
          const eodKeys = getEodKeys('percent')

          const value = mapValuesToArrayOfArrays(
            convertEODNumbersToFormattedNumbers(eodKeys, data.value),
            true
          )

          return getPluginAsyncValue(value)
        }
      )
    }

    bondSize(ast, state) {
      return inferSizeMethod(ast, state)
    }
  }

  Plugin.implementedFunctions = implementedFunctions

  return Plugin
}
