import { FunctionPlugin, SimpleRangeValue } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { isNil } from 'lodash'
import { granularityCellError, tickerCellError } from './cellErrors'
import { api } from '@tracktak/common'
import { financialFields, infoFields } from './fields'
import { tickerRegex } from './matchers'
import {
  getFiscalDateRangeFilterPredicate,
  mapArrayObjectsToSimpleRangeValues,
  mapObjToSimpleRangeValues,
  sizeMethod,
  getFieldValue
} from '../helpers'
import { fiscalDateRangeCellError, getFieldCellError } from '../cellErrors'
import { fiscalDateRangeRegex } from '../matchers'
import { getEODParams, validateEODParamsHasError } from '../eod'

const financialsFieldCellError = getFieldCellError(financialFields)
const infoFieldCellError = getFieldCellError(infoFields)

export const implementedFunctions = {
  'STOCK.GET_COMPANY_FINANCIALS': {
    method: 'getCompanyFinancials',
    arraySizeMethod: 'stockSize',
    isAsyncMethod: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      {
        argumentType: ArgumentTypes.STRING
      },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  },
  'STOCK.GET_PRICE': {
    method: 'getPrice',
    arraySizeMethod: 'stockSize',
    isAsyncMethod: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  },
  'STOCK.GET_COMPANY_INFO': {
    method: 'getCompanyInfo',
    arraySizeMethod: 'stockSize',
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
  'S.GCF': 'STOCK.GET_COMPANY_FINANCIALS',
  'S.GP': 'STOCK.GET_PRICE',
  'S.GCI': 'STOCK.GET_COMPANY_INFO'
}

export const translations = {
  enGB: {
    'S.GCF': 'STOCK.GET_COMPANY_FINANCIALS',
    'S.GP': 'STOCK.GET_PRICE',
    'S.GCI': 'STOCK.GET_COMPANY_INFO'
  }
}

export const fundamentalsFilter =
  'General::CountryISO,General::Code,General::Exchange,General::UpdatedAt,Financials::Balance_Sheet,Financials::Income_Statement,Financials::Cash_Flow'

export class Plugin extends FunctionPlugin {
  getCompanyFinancials(ast, state) {
    const metadata = this.metadata('STOCK.GET_COMPANY_FINANCIALS')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (ticker, field, defaultGranularity, fiscalDateRange) => {
        const isTickerValid = !!ticker.match(tickerRegex)
        const isFieldValid = !!financialFields.find(x => x === field)
        const granularity = defaultGranularity
          ? defaultGranularity
          : fiscalDateRange
          ? 'year'
          : 'ttm'
        const isGranularityValid =
          granularity === 'ttm' ||
          granularity === 'quarter' ||
          granularity === 'year'
        const isFiscalDateRangeValid = fiscalDateRange
          ? !!fiscalDateRange.match(fiscalDateRangeRegex)
          : true

        if (!isTickerValid) {
          return tickerCellError
        }

        if (!isFieldValid) {
          return financialsFieldCellError
        }

        if (!isGranularityValid) {
          return granularityCellError
        }

        if (!isFiscalDateRangeValid) {
          return fiscalDateRangeCellError
        }

        const { data } = await api.getFundamentals(ticker, {
          filter: fundamentalsFilter
        })
        const financials = data.value.financials
        const isInUS = data.value.general.countryISO === 'US'

        let formattedGranularity = granularity

        if (granularity === 'quarter') {
          formattedGranularity = 'quarterly'
        }

        if (granularity === 'year') {
          formattedGranularity = 'yearly'
        }

        return this.getFieldValues(
          field,
          formattedGranularity,
          fiscalDateRange,
          financials,
          isInUS
        )
      }
    )
  }

  getPrice(ast, state) {
    const metadata = this.metadata('STOCK.GET_PRICE')

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

  getCompanyInfo(ast, state) {
    const metadata = this.metadata('STOCK.GET_COMPANY_INFO')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (ticker, field) => {
        const isTickerValid = !!ticker.match(tickerRegex)
        const isFieldValid = infoFields.find(x => x === field)

        if (!isTickerValid) {
          return tickerCellError
        }

        if (!isFieldValid) {
          return infoFieldCellError
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

  stockSize(_, state) {
    return sizeMethod(state)
  }

  getTypeOfStatementToUse(financials, field) {
    if (
      !isNil(financials.incomeStatement.yearly[0][field]) ||
      field === 'incomeStatement'
    ) {
      return 'incomeStatement'
    }

    if (
      !isNil(financials.balanceSheet.yearly[0][field]) ||
      field === 'balanceSheet'
    ) {
      return 'balanceSheet'
    }

    if (
      !isNil(financials.cashFlowStatement.yearly[0][field]) ||
      field === 'cashFlowStatement'
    ) {
      return 'cashFlowStatement'
    }
  }

  getFieldValues(field, granularity, fiscalDateRange, financials, isInUS) {
    const statementKey = this.getTypeOfStatementToUse(financials, field)
    const isStatement =
      field === 'incomeStatement' ||
      field === 'balanceSheet' ||
      field === 'cashFlowStatement'
    const statements =
      granularity === 'ttm' ? [] : financials[statementKey][granularity]

    const getSimpleRangeValues = values => {
      // TODO: If has one length then HF is throwing errors.
      // Raise with HF as this seems to be a bug.
      return values.length === 1
        ? values[0]
        : SimpleRangeValue.onlyValues([values])
    }

    if (fiscalDateRange) {
      const fiscalDateRangeFilterPredicate =
        getFiscalDateRangeFilterPredicate(fiscalDateRange)
      const filteredStatements = statements.filter(
        fiscalDateRangeFilterPredicate
      )

      if (granularity !== 'quarterly') {
        if (isInUS) {
          const filteredQuarters = financials[statementKey].quarterly.filter(
            fiscalDateRangeFilterPredicate
          )
          const ttmStatement = this.getTTMValuesFromQuarters(filteredQuarters)

          filteredStatements.unshift(ttmStatement)
        } else {
          filteredStatements.unshift(financials[statementKey].yearly[0])
        }
      }

      if (isStatement) {
        return mapArrayObjectsToSimpleRangeValues(filteredStatements)
      }

      const values = filteredStatements.map(statement => statement[field])

      return getSimpleRangeValues(values)
    }

    if (granularity !== 'quarterly') {
      if (isInUS) {
        const ttmStatement = this.getTTMValuesFromQuarters(
          financials[statementKey].quarterly
        )

        statements.unshift(ttmStatement)
      } else {
        statements.unshift(financials[statementKey].yearly[0])
      }
    }

    if (granularity !== 'ttm') {
      if (isStatement) {
        return mapArrayObjectsToSimpleRangeValues(statements)
      }

      const values = statements.map(statement => statement[field])

      return getSimpleRangeValues(values)
    }

    if (isStatement) {
      return mapObjToSimpleRangeValues(statements[0])
    }

    return statements[0][field]
  }

  getTTMValuesFromQuarters(statements) {
    const ttm = {}
    // Reverse the array because we want the latest data that isn't numbers
    const firstFourStatements = statements.slice(0, 4).reverse()

    firstFourStatements.forEach(statement => {
      Object.keys(statement).forEach(key => {
        const value = statement[key]

        if (Number.isFinite(value)) {
          ttm[key] = this.sumFinancialStatementValues(firstFourStatements, key)
        } else {
          ttm[key] = value
        }
      })
    })

    ttm.date = 'TTM'

    return ttm
  }

  sumFinancialStatementValues(financialStatements, valueKey) {
    const sumOfFirstFourValues = financialStatements.reduce((acc, curr) => {
      return (acc += curr[valueKey])
    }, 0)

    return sumOfFirstFourValues
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
