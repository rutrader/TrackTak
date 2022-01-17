import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { api } from '@tracktak/common'
import { getPluginAsyncValue, inferSizeMethod } from '../helpers'
import { equityRiskPremiumFields } from '../fields'
import {
  fiscalDateRangeCellError,
  getCountryISOCellError,
  getFieldCellError
} from '../cellErrors'
import { fiscalDateRangeRegex } from '../matchers'
import { NumberType } from '@tracktak/hyperformula/es/interpreter/InterpreterValue'
import { creditRatingInterestSpreadsFields } from './fields'
import countryISOs from './countryISOs'

const equityRiskPremiumsFieldCellError = getFieldCellError(
  equityRiskPremiumFields
)

const creditRatingInterestSpreadsFieldCellError = getFieldCellError(
  creditRatingInterestSpreadsFields
)
const countryISOCellError = getCountryISOCellError(countryISOs)

export const implementedFunctions = {
  'MARKET.GET_EQUITY_RISK_PREMIUMS': {
    method: 'getEquityRiskPremiums',
    arraySizeMethod: 'marketSize',
    inferReturnType: true,
    isAsyncMethod: true,
    parameters: [
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  },
  'MARKET.GET_COUNTRY_EQUITY_RISK_PREMIUM': {
    method: 'getCountryEquityRiskPremium',
    arraySizeMethod: 'marketSize',
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
  'MARKET.GET_CREDIT_RATING_INTEREST_SPREADS': {
    method: 'getCreditRatingInterestSpreads',
    arraySizeMethod: 'marketSize',
    inferReturnType: true,
    isAsyncMethod: true,
    parameters: [
      { argumentType: ArgumentTypes.STRING, optionalArg: true },
      { argumentType: ArgumentTypes.STRING, optionalArg: true }
    ]
  },
  'MARKET.RISK_FREE_RATE': {
    method: 'riskFreeRate',
    parameters: [
      { argumentType: ArgumentTypes.NUMBER, maxValue: 1 },
      { argumentType: ArgumentTypes.NUMBER, maxValue: 1 }
    ],
    returnNumberType: NumberType.NUMBER_PERCENT
  }
}

export const aliases = {
  'M.GERP': 'MARKET.GET_EQUITY_RISK_PREMIUMS',
  'M.GCERP': 'MARKET.GET_COUNTRY_EQUITY_RISK_PREMIUM',
  'M.GCRIS': 'MARKET.GET_CREDIT_RATING_INTEREST_SPREADS',
  'M.RFR': 'MARKET.RISK_FREE_RATE'
}

export const translations = {
  enGB: aliases
}

export class Plugin extends FunctionPlugin {
  getEquityRiskPremiums(ast, state) {
    const metadata = this.metadata('MARKET.GET_EQUITY_RISK_PREMIUMS')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (field, fiscalDateRange) => {
        const isFieldValid = field
          ? !!equityRiskPremiumFields.find(x => x === field)
          : true
        const isFiscalDateRangeValid = fiscalDateRange
          ? !!fiscalDateRange.match(fiscalDateRangeRegex)
          : true

        if (!isFieldValid) {
          return equityRiskPremiumsFieldCellError
        }

        if (!isFiscalDateRangeValid) {
          return fiscalDateRangeCellError
        }

        // TODO: Handle dates for equityRiskPremiums and store in database
        // before updating equityRiskPremiums JSON
        const { data } = await api.getEquityRiskPremiums({
          field,
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
      }
    )
  }

  getCountryEquityRiskPremium(ast, state) {
    const metadata = this.metadata('MARKET.GET_COUNTRY_EQUITY_RISK_PREMIUM')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (countryISO, field, fiscalDateRange) => {
        const isCountryISOValid = !!countryISOs.find(x => x === countryISO)
        const isFieldValid = field
          ? !!equityRiskPremiumFields.find(x => x === field)
          : true
        const isFiscalDateRangeValid = fiscalDateRange
          ? !!fiscalDateRange.match(fiscalDateRangeRegex)
          : true

        if (!isCountryISOValid) {
          return countryISOCellError
        }

        if (!isFieldValid) {
          return equityRiskPremiumsFieldCellError
        }

        if (!isFiscalDateRangeValid) {
          return fiscalDateRangeCellError
        }

        // TODO: Handle dates for equityRiskPremiums and store in database
        // before updating equityRiskPremiums JSON
        const { data } = await api.getCountryEquityRiskPremium(countryISO, {
          field,
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
      }
    )
  }

  getCreditRatingInterestSpreads(ast, state) {
    const metadata = this.metadata('MARKET.GET_CREDIT_RATING_INTEREST_SPREADS')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (field, fiscalDateRange) => {
        const isFieldValid = field
          ? !!creditRatingInterestSpreadsFields.find(x => x === field)
          : true
        const isFiscalDateRangeValid = fiscalDateRange
          ? !!fiscalDateRange.match(fiscalDateRangeRegex)
          : true

        if (!isFieldValid) {
          return creditRatingInterestSpreadsFieldCellError
        }

        if (!isFiscalDateRangeValid) {
          return fiscalDateRangeCellError
        }

        // TODO: Handle dates for equityRiskPremiums and store in database
        // before updating equityRiskPremiums JSON
        const { data } = await api.getCreditRatingInterestSpreads({
          field,
          fiscalDateRange
        })

        return getPluginAsyncValue(data.value)
      }
    )
  }

  riskFreeRate(ast, state) {
    const metadata = this.metadata('MARKET.RISK_FREE_RATE')

    return this.runFunction(
      ast.args,
      state,
      metadata,
      (governmentBondRate, inflationRate) => {
        return (1 + governmentBondRate) / (1 + inflationRate) - 1
      }
    )
  }

  marketSize(ast, state) {
    return inferSizeMethod(ast, state)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
