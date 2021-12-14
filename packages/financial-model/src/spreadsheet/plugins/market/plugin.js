import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { api } from '@tracktak/common'
import { getFieldValue, sizeMethod } from '../helpers'
import { equityRiskPremiumFields } from '../fields'
import { fiscalDateRangeCellError, getFieldCellError } from '../cellErrors'
import { fiscalDateRangeRegex } from '../matchers'
import { NumberType } from '@tracktak/hyperformula/es/interpreter/InterpreterValue'

const equityRiskPremiumsFieldCellError = getFieldCellError(
  equityRiskPremiumFields
)

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
  'MARKET.RISK_FREE_RATE': {
    method: 'riskFreeRate',
    parameters: [
      { argumentType: ArgumentTypes.ANY, minValue: 0 },
      { argumentType: ArgumentTypes.NUMBER, minValue: 0 }
    ],
    returnNumberType: NumberType.NUMBER_PERCENT
  }
}

export const aliases = {
  'M.RFR': 'MARKET.RISK_FREE_RATE'
}

export const translations = {
  enGB: {
    'M.RFR': 'MARKET.RISK_FREE_RATE'
  }
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

        return getFieldValue(data.value, true)
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

  marketSize(_, state) {
    return sizeMethod(state)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
