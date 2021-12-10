import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { api } from '@tracktak/common'
import {
  convertFiscalDateRangeToFromTo,
  getFieldValue,
  sizeMethod
} from '../../helpers'
import { fiscalDateRangeRegex } from '../../matchers'
import countryCodes from './countryCodes'
import {
  countryCodeCellError,
  granularityCellError,
  maturityCellError
} from './cellErrors'
import { maturityRegex } from './matchers'
import fields from './fields'
import { fiscalDateRangeCellError, getFieldCellError } from '../../cellErrors'
import { snakeCase } from 'change-case'

const fieldCellError = getFieldCellError(fields)

export const implementedFunctions = {
  'BOND.COUNTRY': {
    method: 'country',
    arraySizeMethod: 'countrySize',
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
  'B.COUNTRY': 'BOND.COUNTRY'
}

export const translations = {
  enGB: {
    'B.COUNTRY': 'BOND.COUNTRY'
  }
}

export class Plugin extends FunctionPlugin {
  country(ast, state) {
    const metadata = this.metadata('BOND.COUNTRY')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (countryCode, maturity, field, granularity, fiscalDateRange) => {
        const isCountryCodeValid = !!countryCodes.find(x => x === countryCode)
        const isMaturityValidValid = !!maturity.match(maturityRegex)
        const isFieldValid = field ? !!fields.find(x => x === field) : true
        const isGranularityValid = granularity
          ? granularity === 'day' ||
            granularity === 'week' ||
            granularity === 'month'
          : true
        const isFiscalDateRangeValid = fiscalDateRange
          ? !!fiscalDateRange.match(fiscalDateRangeRegex)
          : true

        if (!isCountryCodeValid) {
          return countryCodeCellError
        }

        if (!isMaturityValidValid) {
          return maturityCellError
        }

        if (!isFieldValid) {
          return fieldCellError
        }

        if (!isGranularityValid) {
          return granularityCellError
        }

        if (!isFiscalDateRangeValid) {
          return fiscalDateRangeCellError
        }

        const params = {}

        if (field) {
          params.filter = snakeCase(field)
        }

        if (fiscalDateRange) {
          const { from, to } = convertFiscalDateRangeToFromTo(fiscalDateRange)

          params.from = from
          params.to = to
        }

        if (granularity === 'day') {
          params.period = 'd'
        }

        if (granularity === 'week') {
          params.period = 'w'
        }

        if (granularity === 'month') {
          params.period = 'm'
        }

        const maturityGranularity = [...maturity.matchAll(maturityRegex)][0][1]

        let formattedMaturity = parseInt(maturity, 10)

        if (maturityGranularity === 'yr') {
          formattedMaturity += 'Y'
        } else {
          formattedMaturity += 'M'
        }

        const { data } = await api.getGovernmentBond(
          `${countryCode}${formattedMaturity}`,
          {
            order: 'd',
            ...params
          }
        )
        const value = data.value

        return getFieldValue(value, true)
      }
    )
  }

  countrySize(_, state) {
    return sizeMethod(state)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
