import { FunctionPlugin, SimpleRangeValue } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { isNil } from 'lodash'
import { granularityCellError, tickerCellError } from '../cellErrors'
import { api } from '@tracktak/common'
import { fields } from './fields'
import { tickerRegex } from '../matchers'
import {
  getFiscalDateRangeFilterPredicate,
  mapArrayObjectsToSimpleRangeValues,
  mapObjToSimpleRangeValues,
  sizeMethod
} from '../../helpers'
import { fiscalDateRangeCellError, getFieldCellError } from '../../cellErrors'
import { fiscalDateRangeRegex } from '../../matchers'

const fieldCellError = getFieldCellError(fields)

export const implementedFunctions = {
  'STOCK.GET_COMPANY_FINANCIALS': {
    method: 'getCompanyFinancials',
    arraySizeMethod: 'getCompanyFinancialsSize',
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
  }
}

export const aliases = {
  'S.GCF': 'STOCK.GET_COMPANY_FINANCIALS'
}

export const translations = {
  enGB: {
    'S.GCF': 'STOCK.GET_COMPANY_FINANCIALS'
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
        const isFieldValid = !!fields.find(x => x === field)
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
          return fieldCellError
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
          financials
        )
      }
    )
  }

  getCompanyFinancialsSize(_, state) {
    return sizeMethod(state)
  }

  getTypeOfStatementToUse(financials, field) {
    if (
      !isNil(financials.incomeStatement.ttm[field]) ||
      field === 'incomeStatement'
    ) {
      return 'incomeStatement'
    }

    if (
      !isNil(financials.balanceSheet.ttm[field]) ||
      field === 'balanceSheet'
    ) {
      return 'balanceSheet'
    }

    if (
      !isNil(financials.cashFlowStatement.ttm[field]) ||
      field === 'cashFlowStatement'
    ) {
      return 'cashFlowStatement'
    }
  }

  getFieldValues(field, granularity, fiscalDateRange, financials) {
    const statementKey = this.getTypeOfStatementToUse(financials, field)
    const isStatement =
      field === 'incomeStatement' ||
      field === 'balanceSheet' ||
      field === 'cashFlowStatement'
    const statements = financials[statementKey][granularity]

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

      if (isStatement) {
        const filteredStatements = [
          financials[statementKey].ttm,
          ...statements
        ].filter(fiscalDateRangeFilterPredicate)

        return mapArrayObjectsToSimpleRangeValues(filteredStatements)
      }

      const values = statements
        .filter(fiscalDateRangeFilterPredicate)
        .map(statement => statement[field])

      return getSimpleRangeValues(values)
    }

    if (granularity !== 'ttm') {
      if (isStatement) {
        return mapArrayObjectsToSimpleRangeValues([
          financials[statementKey].ttm,
          ...statements
        ])
      }

      const values = statements.map(statement => statement[field])

      return getSimpleRangeValues(values)
    }

    const statement = statements

    if (isStatement) {
      return mapObjToSimpleRangeValues(statement)
    }

    return statement[field]
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
