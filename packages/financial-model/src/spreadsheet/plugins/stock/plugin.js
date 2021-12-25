import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import {
  granularityCellError,
  industryTypeCellError,
  tickerCellError
} from './cellErrors'
import { api } from '@tracktak/common'
import {
  financialFields,
  industryAverageFields,
  infoFields,
  outstandingSharesFields,
  ratioFields
} from './fields'
import { tickerRegex } from './matchers'
import { inferSizeMethod, getPluginAsyncValue } from '../helpers'
import { fiscalDateRangeCellError, getFieldCellError } from '../cellErrors'
import { fiscalDateRangeRegex } from '../matchers'
import { validateEODParamsHasError } from '../eod'
import { equityRiskPremiumFields } from '../fields'
import { creditRatingInterestSpreadsFields } from '../market/fields'

const financialsFieldCellError = getFieldCellError(financialFields)
const infoFieldCellError = getFieldCellError(infoFields)
const industryAveragesFieldCellError = getFieldCellError(industryAverageFields)
const equityRiskPremiumsFieldCellError = getFieldCellError(
  equityRiskPremiumFields
)
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
  },
  'STOCK.GET_COMPANY_EQUITY_RISK_PREMIUM': {
    method: 'getCompanyEquityRiskPremium',
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
  'STOCK.GET_COMPANY_CREDIT_RATING_INTEREST_SPREAD': {
    method: 'getCompanyCreditRatingInterestSpread',
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

export const aliases = {
  'S.GCF': 'STOCK.GET_COMPANY_FINANCIALS',
  'S.GCR': 'STOCK.GET_COMPANY_RATIOS',
  'S.GCP': 'STOCK.GET_COMPANY_PRICES',
  'S.GCI': 'STOCK.GET_COMPANY_INFO',
  'S.GIA': 'STOCK.GET_INDUSTRY_AVERAGES',
  'S.GCIA': 'STOCK.GET_COMPANY_INDUSTRY_AVERAGES',
  'S.GCERP': 'STOCK.GET_COMPANY_EQUITY_RISK_PREMIUM',
  'S.GCCRIS': 'STOCK.GET_COMPANY_CREDIT_RATING_INTEREST_SPREAD',
  'S.GCOS': 'STOCK.GET_COMPANY_OUTSTANDING_SHARES'
}

export const translations = {
  enGB: aliases
}

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

        const isFiscalDateRangeValid =
          this.getIsFiscalDateRangeValid(fiscalDateRange)

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
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
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
        const isFieldValid = field ? !!ratioFields.find(x => x === field) : true
        const granularity = defaultGranularity
          ? defaultGranularity
          : fiscalDateRange
          ? 'year'
          : 'latest'

        const isGranularityValid =
          granularity === 'latest' ||
          granularity === 'quarter' ||
          granularity === 'year'

        const isFiscalDateRangeValid =
          this.getIsFiscalDateRangeValid(fiscalDateRange)

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
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
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

        const { data } = await api.getCompanyPrices(ticker, {
          field,
          granularity,
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
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
        const isFiscalDateRangeValid =
          this.getIsFiscalDateRangeValid(fiscalDateRange)

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
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
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
        const isFiscalDateRangeValid =
          this.getIsFiscalDateRangeValid(fiscalDateRange)

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
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
      }
    )
  }

  getCompanyEquityRiskPremium(ast, state) {
    const metadata = this.metadata('STOCK.GET_COMPANY_EQUITY_RISK_PREMIUM')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (ticker, field, fiscalDateRange) => {
        const isTickerValid = !!ticker.match(tickerRegex)
        const isFieldValid = field
          ? !!equityRiskPremiumFields.find(x => x === field)
          : true
        const isFiscalDateRangeValid =
          this.getIsFiscalDateRangeValid(fiscalDateRange)

        if (!isTickerValid) {
          return tickerCellError
        }

        if (!isFieldValid) {
          return equityRiskPremiumsFieldCellError
        }

        if (!isFiscalDateRangeValid) {
          return fiscalDateRangeCellError
        }

        // TODO: Handle dates for equityRiskPremiums and store in database
        // before updating equityRiskPremiums JSON
        const { data } = await api.getCompanyEquityRiskPremium(ticker, {
          field,
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
      }
    )
  }

  getCompanyCreditRatingInterestSpread(ast, state) {
    const metadata = this.metadata(
      'STOCK.GET_COMPANY_CREDIT_RATING_INTEREST_SPREAD'
    )

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (ticker, field, fiscalDateRange) => {
        const isTickerValid = !!ticker.match(tickerRegex)
        const isFieldValid = field
          ? !!creditRatingInterestSpreadsFields.find(x => x === field)
          : true
        const isFiscalDateRangeValid =
          this.getIsFiscalDateRangeValid(fiscalDateRange)

        if (!isTickerValid) {
          return tickerCellError
        }

        if (!isFieldValid) {
          return equityRiskPremiumsFieldCellError
        }

        if (!isFiscalDateRangeValid) {
          return fiscalDateRangeCellError
        }

        // TODO: Handle dates for creditRatingInterestSpreads and store in database
        // before updating creditRatingInterestSpreads JSON
        const { data } = await api.getCompanyCreditRatingInterestSpreads(
          ticker,
          {
            field,
            fiscalDateRange
          }
        )

        return getPluginAsyncValue(data.value)
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
        const granularity = defaultGranularity
          ? defaultGranularity
          : fiscalDateRange
          ? 'year'
          : 'latest'

        const isGranularityValid =
          granularity === 'latest' ||
          granularity === 'quarter' ||
          granularity === 'year'

        const isFiscalDateRangeValid =
          this.getIsFiscalDateRangeValid(fiscalDateRange)

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
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
      }
    )
  }

  stockSize(ast, state) {
    return inferSizeMethod(ast, state)
  }

  getIsFiscalDateRangeValid(fiscalDateRange) {
    return fiscalDateRange
      ? !!fiscalDateRange.match(fiscalDateRangeRegex)
      : true
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
