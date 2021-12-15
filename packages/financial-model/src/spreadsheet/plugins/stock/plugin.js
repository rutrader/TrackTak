import { FunctionPlugin, SimpleRangeValue } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { isNil } from 'lodash'
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
  ratioFields
} from './fields'
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
import { equityRiskPremiumFields } from '../fields'
import { creditRatingInterestSpreadsFields } from '../market/fields'

const financialsFieldCellError = getFieldCellError(financialFields)
const infoFieldCellError = getFieldCellError(infoFields)
const industryAveragesFieldCellError = getFieldCellError(industryAverageFields)
const equityRiskPremiumsFieldCellError = getFieldCellError(
  equityRiskPremiumFields
)
const ratioFieldCellError = getFieldCellError(ratioFields)

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
  'STOCK.GET_PRICE': {
    method: 'getPrice',
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
  'STOCK.GET_COMPANY_INDUSTRY_AVERAGE': {
    method: 'getCompanyIndustryAverage',
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
  'S.GP': 'STOCK.GET_PRICE',
  'S.GCI': 'STOCK.GET_COMPANY_INFO',
  'S.GIA': 'STOCK.GET_INDUSTRY_AVERAGES',
  'S.GCIA': 'STOCK.GET_COMPANY_INDUSTRY_AVERAGE',
  'S.GCERP': 'STOCK.GET_COMPANY_EQUITY_RISK_PREMIUM',
  'S.GCCRIS': 'STOCK.GET_COMPANY_CREDIT_RATING_INTEREST_SPREAD'
}

export const translations = {
  enGB: aliases
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

        const { data } = await api.getCompanyFundamentals(ticker, {
          filter: fundamentalsFilter
        })
        const financials = data.value.financials
        const isInUS = data.value.general.countryISO === 'US'

        const formattedGranularity =
          this.getFundamentalsFormattedGranularity(granularity)

        const statementKey = this.getTypeOfStatementToUse(financials, field)
        const isStatement =
          field === 'incomeStatement' ||
          field === 'balanceSheet' ||
          field === 'cashFlowStatement'
        const statements =
          formattedGranularity === 'ttm'
            ? []
            : financials[statementKey][formattedGranularity]

        if (fiscalDateRange) {
          const fiscalDateRangeFilterPredicate =
            getFiscalDateRangeFilterPredicate(fiscalDateRange)
          const filteredStatements = statements.filter(
            fiscalDateRangeFilterPredicate
          )

          if (formattedGranularity !== 'quarterly') {
            if (isInUS) {
              const filteredQuarters = financials[
                statementKey
              ].quarterly.filter(fiscalDateRangeFilterPredicate)
              const ttmStatement =
                this.getTTMValuesFromQuarters(filteredQuarters)

              filteredStatements.unshift(
                this.getStatementWithTTMDate(ttmStatement)
              )
            } else {
              filteredStatements.unshift(
                this.getStatementWithTTMDate(financials[statementKey].yearly[0])
              )
            }
          }

          if (isStatement) {
            return mapArrayObjectsToSimpleRangeValues(filteredStatements)
          }

          const values = filteredStatements.map(statement => statement[field])

          return this.getFixedSimpleRangeValues(values)
        }

        if (formattedGranularity !== 'quarterly') {
          if (isInUS) {
            const ttmStatement = this.getTTMValuesFromQuarters(
              financials[statementKey].quarterly
            )

            statements.unshift(this.getStatementWithTTMDate(ttmStatement))
          } else {
            statements.unshift(
              this.getStatementWithTTMDate(financials[statementKey].yearly[0])
            )
          }
        }

        if (formattedGranularity !== 'ttm') {
          if (isStatement) {
            return mapArrayObjectsToSimpleRangeValues(statements)
          }

          const values = statements.map(statement => statement[field])

          return this.getFixedSimpleRangeValues(values)
        }

        if (isStatement) {
          return mapObjToSimpleRangeValues(statements[0])
        }

        return statements[0][field]
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
          filter: fundamentalsFilter
        })

        const ratios = data.value.ratios
        const isInUS = data.value.general.countryISO === 'US'

        const formattedGranularity =
          this.getFundamentalsFormattedGranularity(granularity)

        const ratioValues =
          formattedGranularity === 'latest' ? [] : ratios[formattedGranularity]

        if (fiscalDateRange) {
          const fiscalDateRangeFilterPredicate =
            getFiscalDateRangeFilterPredicate(fiscalDateRange)
          const filteredRatios = ratioValues.filter(
            fiscalDateRangeFilterPredicate
          )

          if (formattedGranularity !== 'quarterly') {
            if (isInUS) {
              filteredRatios.unshift(
                this.getRatiosWithLatestDate(ratios.quarterly[0])
              )
            } else {
              filteredRatios.unshift(
                this.getRatiosWithLatestDate(ratios.yearly[0])
              )
            }
          }

          if (!field) {
            return mapArrayObjectsToSimpleRangeValues(filteredRatios)
          }

          const values = filteredRatios.map(ratios => ratios[field])

          return this.getFixedSimpleRangeValues(values)
        }

        if (formattedGranularity !== 'quarterly') {
          if (isInUS) {
            ratioValues.unshift(
              this.getRatiosWithLatestDate(ratios.quarterly[0])
            )
          } else {
            ratioValues.unshift(this.getRatiosWithLatestDate(ratios.yearly[0]))
          }
        }

        if (formattedGranularity !== 'latest') {
          if (!field) {
            return mapArrayObjectsToSimpleRangeValues(ratioValues)
          }

          const values = ratioValues.map(ratios => ratios[field])

          return this.getFixedSimpleRangeValues(values)
        }

        if (!field) {
          return mapObjToSimpleRangeValues(ratioValues[0])
        }

        return ratioValues[0][field]
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

        const { data } = await api.getCompanyEOD(ticker, params)

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

        const { data } = await api.getCompanyFundamentals(ticker, {
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

        return getFieldValue(data.value, true)
      }
    )
  }

  getCompanyIndustryAverage(ast, state) {
    const metadata = this.metadata('STOCK.GET_COMPANY_INDUSTRY_AVERAGE')

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

        return getFieldValue(data.value)
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

        return getFieldValue(data.value)
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

        return getFieldValue(data.value)
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

  getIsFiscalDateRangeValid(fiscalDateRange) {
    return fiscalDateRange
      ? !!fiscalDateRange.match(fiscalDateRangeRegex)
      : true
  }

  getFixedSimpleRangeValues(values) {
    // TODO: If has one length then HF is throwing errors.
    // Raise with HF as this seems to be a bug.
    return values.length === 1
      ? values[0]
      : SimpleRangeValue.onlyValues([values])
  }

  getFundamentalsFormattedGranularity(granularity) {
    let formattedGranularity = granularity

    if (granularity === 'quarter') {
      formattedGranularity = 'quarterly'
    }

    if (granularity === 'year') {
      formattedGranularity = 'yearly'
    }

    return formattedGranularity
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

    return ttm
  }

  getStatementWithTTMDate(statement) {
    return {
      ...statement,
      date: 'TTM'
    }
  }

  getRatiosWithLatestDate(statement) {
    return {
      ...statement,
      date: 'Latest'
    }
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
