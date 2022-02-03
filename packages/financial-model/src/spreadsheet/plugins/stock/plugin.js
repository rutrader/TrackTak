import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import {
  granularityCellError,
  industryTypeCellError,
  tickerCellError
} from './cellErrors'
import * as api from '@tracktak/common/src/api/api'
import {
  financialFields,
  industryAverageFields,
  infoFields,
  outstandingSharesFields,
  ratioFields
} from './fields'
import { tickerRegex } from './matchers'
import {
  inferSizeMethod,
  getPluginAsyncValue,
  mapValuesToArrayOfArrays,
  convertEODNumbersToFormattedNumbers,
  convertFinancialNumbersToFormattedNumbers
} from '../helpers'
import { fiscalDateRangeCellError, getFieldCellError } from '../cellErrors'
import { fiscalDateRangeRegex } from '../matchers'
import { getEodKeys, validateEODParamsHasError } from '../eod'

const financialsFieldCellError = getFieldCellError(financialFields)
const infoFieldCellError = getFieldCellError(infoFields)
const industryAveragesFieldCellError = getFieldCellError(industryAverageFields)
const ratioFieldCellError = getFieldCellError(ratioFields)
const outstandingSharesFieldCellError = getFieldCellError(
  outstandingSharesFields
)

export const implementedFunctions = {
  'STOCK.GET_COMPANY_FINANCIALS': {
    method: 'getCompanyFinancials',
    arraySizeMethod: 'stockSize',
    isAsyncMethod: true,
    inferReturnType: true,
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
  'STOCK.GET_COMPANY_RATIOS': {
    method: 'getCompanyRatios',
    arraySizeMethod: 'stockSize',
    isAsyncMethod: true,
    inferReturnType: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      {
        argumentType: ArgumentTypes.STRING,
        optionalArg: true
      },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  },
  'STOCK.GET_COMPANY_OUTSTANDING_SHARES': {
    method: 'getCompanyOutstandingShares',
    arraySizeMethod: 'stockSize',
    isAsyncMethod: true,
    inferReturnType: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      {
        argumentType: ArgumentTypes.STRING,
        optionalArg: true
      },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  },
  'STOCK.GET_COMPANY_PRICES': {
    method: 'getCompanyPrices',
    arraySizeMethod: 'stockSize',
    isAsyncMethod: true,
    inferReturnType: true,
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
    inferReturnType: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      {
        argumentType: ArgumentTypes.STRING
      }
    ]
  },
  'STOCK.GET_INDUSTRY_AVERAGES': {
    method: 'getIndustryAverages',
    arraySizeMethod: 'stockSize',
    isAsyncMethod: true,
    inferReturnType: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  },
  'STOCK.GET_COMPANY_INDUSTRY_AVERAGES': {
    method: 'getCompanyIndustryAverages',
    arraySizeMethod: 'stockSize',
    isAsyncMethod: true,
    inferReturnType: true,
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  }
}

export const translations = {
  enGB: {
    'STOCK.GET_COMPANY_FINANCIALS': 'STOCK.GET_COMPANY_FINANCIALS',
    'STOCK.GET_COMPANY_RATIOS': 'STOCK.GET_COMPANY_RATIOS',
    'STOCK.GET_COMPANY_OUTSTANDING_SHARES':
      'STOCK.GET_COMPANY_OUTSTANDING_SHARES',
    'STOCK.GET_COMPANY_PRICES': 'STOCK.GET_COMPANY_PRICES',
    'STOCK.GET_COMPANY_INFO': 'STOCK.GET_COMPANY_INFO',
    'STOCK.GET_INDUSTRY_AVERAGES': 'STOCK.GET_INDUSTRY_AVERAGES',
    'STOCK.GET_COMPANY_INDUSTRY_AVERAGES': 'STOCK.GET_COMPANY_INDUSTRY_AVERAGES'
  }
}

export const getPlugin = dataGetter => {
  class Plugin extends FunctionPlugin {
    getCompanyFinancials(ast, state) {
      const metadata = this.metadata('STOCK.GET_COMPANY_FINANCIALS')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (ticker, field, defaultGranularity, fiscalDateRange) => {
          const isTickerValid = !!ticker.match(tickerRegex)
          const isFieldValid = !!financialFields.find(x => x === field)
          const date = fiscalDateRange ?? dataGetter.apiFrozenTimestamp
          const granularity = defaultGranularity
            ? defaultGranularity
            : date
            ? 'year'
            : 'ttm'

          const isGranularityValid =
            granularity === 'ttm' ||
            granularity === 'quarter' ||
            granularity === 'year'

          const isFiscalDateRangeValid = this.getIsFiscalDateRangeValid(date)

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

          const { data } = await api.getCompanyFinancials(ticker, {
            granularity,
            field,
            fiscalDateRange: date
          })

          return getPluginAsyncValue(
            mapValuesToArrayOfArrays(
              convertFinancialNumbersToFormattedNumbers(data.value)
            )
          )
        }
      )
    }

    getCompanyRatios(ast, state) {
      const metadata = this.metadata('STOCK.GET_COMPANY_RATIOS')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (ticker, field, defaultGranularity, fiscalDateRange) => {
          const isTickerValid = !!ticker.match(tickerRegex)
          const isFieldValid = field
            ? !!ratioFields.find(x => x === field)
            : true
          const date = fiscalDateRange ?? dataGetter.apiFrozenTimestamp
          const granularity = defaultGranularity
            ? defaultGranularity
            : date
            ? 'year'
            : 'latest'
          const isGranularityValid =
            granularity === 'latest' ||
            granularity === 'quarter' ||
            granularity === 'year'

          const isFiscalDateRangeValid = this.getIsFiscalDateRangeValid(date)

          if (!isTickerValid) {
            return tickerCellError
          }

          if (!isFieldValid) {
            return ratioFieldCellError
          }

          if (!isGranularityValid) {
            return granularityCellError
          }

          if (!isFiscalDateRangeValid) {
            return fiscalDateRangeCellError
          }

          const { data } = await api.getCompanyRatios(ticker, {
            granularity,
            field,
            fiscalDateRange: date
          })

          return getPluginAsyncValue(mapValuesToArrayOfArrays(data.value))
        }
      )
    }

    getCompanyPrices(ast, state) {
      const metadata = this.metadata('STOCK.GET_COMPANY_PRICES')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (ticker, field, granularity, fiscalDateRange) => {
          const isTickerValid = !!ticker.match(tickerRegex)
          const date = fiscalDateRange ?? dataGetter.apiFrozenTimestamp

          const error = validateEODParamsHasError(field, granularity, date)

          if (!isTickerValid) {
            return tickerCellError
          }

          if (error) {
            return error
          }

          const promises = await Promise.all([
            api.getEODHistoricalDataFundamentals(ticker, {
              filter: 'General::CurrencyCode'
            }),
            api.getCompanyPrices(ticker, {
              field,
              granularity,
              fiscalDateRange: date
            })
          ])

          const currencyCode = promises[0].data.value
          const prices = promises[1].data.value
          const eodKeys = getEodKeys('currency')

          const value = mapValuesToArrayOfArrays(
            convertEODNumbersToFormattedNumbers(eodKeys, prices, currencyCode),
            true
          )

          return getPluginAsyncValue(value)
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

          const { data } = await api.getEODHistoricalDataFundamentals(ticker, {
            filter: 'General,SharesStats,Highlights'
          })
          const info = {
            ...data.value.general,
            ...data.value.sharesStats,
            ...data.value.highlights
          }

          return getPluginAsyncValue(info[field])
        }
      )
    }

    getIndustryAverages(ast, state) {
      const metadata = this.metadata('STOCK.GET_INDUSTRY_AVERAGES')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (type, field, fiscalDateRange) => {
          const isTypeValid = type === 'US' || 'Global'
          const isFieldValid = field
            ? !!industryAverageFields.find(x => x === field)
            : true
          const date = fiscalDateRange ?? dataGetter.apiFrozenTimestamp
          const isFiscalDateRangeValid = this.getIsFiscalDateRangeValid(date)

          if (!isTypeValid) {
            return industryTypeCellError
          }

          if (!isFieldValid) {
            return industryAveragesFieldCellError
          }

          if (!isFiscalDateRangeValid) {
            return fiscalDateRangeCellError
          }

          // TODO: Handle dates for industryAverages and store in database
          // before updating industryAverages JSON
          const { data } = await api.getIndustryAverages(type, {
            field,
            fiscalDateRange: date
          })

          return getPluginAsyncValue(mapValuesToArrayOfArrays(data.value, true))
        }
      )
    }

    getCompanyIndustryAverages(ast, state) {
      const metadata = this.metadata('STOCK.GET_COMPANY_INDUSTRY_AVERAGES')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (ticker, field, fiscalDateRange) => {
          const isTickerValid = !!ticker.match(tickerRegex)
          const isFieldValid = field
            ? !!industryAverageFields.find(x => x === field)
            : true
          const date = fiscalDateRange ?? dataGetter.apiFrozenTimestamp
          const isFiscalDateRangeValid = this.getIsFiscalDateRangeValid(date)

          if (!isTickerValid) {
            return tickerCellError
          }

          if (!isFieldValid) {
            return industryAveragesFieldCellError
          }

          if (!isFiscalDateRangeValid) {
            return fiscalDateRangeCellError
          }

          // TODO: Handle dates for industryAverages and store in database
          // before updating industryAverages JSON
          const { data } = await api.getCompanyIndustryAverage(ticker, {
            field,
            fiscalDateRange: date
          })

          return getPluginAsyncValue(mapValuesToArrayOfArrays(data.value))
        }
      )
    }

    getCompanyOutstandingShares(ast, state) {
      const metadata = this.metadata('STOCK.GET_COMPANY_OUTSTANDING_SHARES')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (ticker, field, defaultGranularity, fiscalDateRange) => {
          const isTickerValid = !!ticker.match(tickerRegex)
          const isFieldValid = field
            ? !!outstandingSharesFields.find(x => x === field)
            : true
          const date = fiscalDateRange ?? dataGetter.apiFrozenTimestamp
          const granularity = defaultGranularity
            ? defaultGranularity
            : date
            ? 'year'
            : 'latest'

          const isGranularityValid =
            granularity === 'latest' ||
            granularity === 'quarter' ||
            granularity === 'year'

          const isFiscalDateRangeValid = this.getIsFiscalDateRangeValid(date)

          if (!isTickerValid) {
            return tickerCellError
          }

          if (!isFieldValid) {
            return outstandingSharesFieldCellError
          }

          if (!isGranularityValid) {
            return granularityCellError
          }

          if (!isFiscalDateRangeValid) {
            return fiscalDateRangeCellError
          }

          const { data } = await api.getCompanyOutstandingShares(ticker, {
            granularity,
            field,
            fiscalDateRange: date
          })

          return getPluginAsyncValue(mapValuesToArrayOfArrays(data.value))
        }
      )
    }

    stockSize(ast, state) {
      return inferSizeMethod(ast, state)
    }

    getIsFiscalDateRangeValid(date) {
      return date ? !!date.match(fiscalDateRangeRegex) : true
    }
  }

  Plugin.implementedFunctions = implementedFunctions

  return Plugin
}
