import { FunctionPlugin } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { api } from '@tracktak/common'
import { getFieldValue, sizeMethod } from '../helpers'
import { equityRiskPremiumFields } from '../fields'
import { getFieldCellError } from '../cellErrors'

const equityRiskPremiumsFieldCellError = getFieldCellError(
  equityRiskPremiumFields
)

export const implementedFunctions = {
  'COUNTRY.GET_EQUITY_RISK_PREMIUMS': {
    method: 'getEquityRiskPremiums',
    arraySizeMethod: 'countrySize',
    isAsyncMethod: true,
    parameters: [{ argumentType: ArgumentTypes.STRING, optionalArg: true }]
  }
}

export const aliases = {
  'C.GERP': 'COUNTRY.GET_EQUITY_RISK_PREMIUMS'
}

export const translations = {
  enGB: {
    'C.GERP': 'COUNTRY.GET_EQUITY_RISK_PREMIUMS'
  }
}

export class Plugin extends FunctionPlugin {
  getEquityRiskPremiums(ast, state) {
    const metadata = this.metadata('COUNTRY.GET_EQUITY_RISK_PREMIUMS')

    return this.runAsyncFunction(ast.args, state, metadata, async field => {
      const isFieldValid = field
        ? !!equityRiskPremiumFields.find(x => x === field)
        : true

      if (!isFieldValid) {
        return equityRiskPremiumsFieldCellError
      }

      // TODO: Handle dates for equityRiskPremiums and store in database
      // before updating equityRiskPremiums JSON
      const { data } = await api.getEquityRiskPremiums({
        field
      })

      return getFieldValue(data.value, true)
    })
  }

  countrySize(_, state) {
    return sizeMethod(state)
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
