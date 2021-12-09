import { FunctionPlugin, SimpleRangeValue } from '@tracktak/hyperformula'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { isNil } from 'lodash'
import {
  fiscalDateRangeCellError,
  getFieldsCellError,
  granularityCellError,
  tickerCellError
} from '../cellErrors'
import { api } from '@tracktak/common'
import dayjs from 'dayjs'
import { fields } from './fields'
import { tickerRegex, fiscalDateRangeRegex } from '../matchers'
import {
  mapArrayObjectsToSimpleRangeValues,
  mapObjToSimpleRangeValues,
  sizeMethod
} from '../../helpers'

const fieldsString = fields.join(', ')
const fieldsCellError = getFieldsCellError(fieldsString)

export const implementedFunctions = {
  'STOCK.FINANCIALS': {
    method: 'financials',
    arraySizeMethod: 'financialsSize',
    isAsyncMethod: true,
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
  }
}

export const aliases = {
  'S.FIN': 'STOCK.FINANCIALS'
}

export const translations = {
  enGB: {
    'S.FIN': 'STOCK.FINANCIALS'
  }
}

export const fundamentalsFilter =
  'General::CountryISO,General::Code,General::Exchange,General::UpdatedAt,Financials::Balance_Sheet,Financials::Income_Statement,Financials::Cash_Flow'

export class Plugin extends FunctionPlugin {
  financials(ast, state) {
    const metadata = this.metadata('STOCK.FINANCIALS')

    return this.runAsyncFunction(
      ast.args,
      state,
      metadata,
      async (ticker, field, defaultGranularity, fiscalDateRange) => {
        const isTickerValid = !!ticker.match(tickerRegex)
        const isFieldValid = !!fields.find(x => x === field)
        const granularity =
          !isNil(defaultGranularity) && defaultGranularity !== ''
            ? defaultGranularity
            : fiscalDateRange
            ? 'yearly'
            : 'ttm'
        const isGranularityValid =
          granularity === 'ttm' ||
          granularity === 'quarterly' ||
          granularity === 'yearly'
        const isFiscalDateRangeValid = fiscalDateRange
          ? !!fiscalDateRange.match(fiscalDateRangeRegex)
          : true

        if (!isTickerValid) {
          return tickerCellError
        }

        if (!isFieldValid) {
          return fieldsCellError
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

        return this.getFieldValues(
          field,
          granularity,
          fiscalDateRange,
          financials
        )
      }
    )
  }

  financialsSize(_, state) {
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
      const [fiscalDate, operator] =
        this.parseFiscalDateFromRange(fiscalDateRange)
      const dateGranularity = 'month'
      const dateFilterPredicate = ({ date }) => {
        const realDate =
          date.toLowerCase() === 'ttm' ? statements[0].date : date

        if (operator === '>') {
          return dayjs(realDate).isAfter(fiscalDate, dateGranularity)
        }

        if (operator === '<') {
          return dayjs(realDate).isBefore(fiscalDate, dateGranularity)
        }

        return dayjs(realDate).isBetween(
          fiscalDate[0],
          fiscalDate[1],
          dateGranularity
        )
      }

      if (isStatement) {
        const filteredStatements = [
          financials[statementKey].ttm,
          ...statements
        ].filter(dateFilterPredicate)

        return mapArrayObjectsToSimpleRangeValues(filteredStatements)
      }

      const values = statements
        .filter(dateFilterPredicate)
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

  parseFiscalDateFromRange(fiscalDateRange) {
    if (fiscalDateRange.charAt(0) === '>') {
      const fiscalDate = fiscalDateRange.slice(1)

      return [fiscalDate, '>']
    }

    if (fiscalDateRange.charAt(0) === '<') {
      const fiscalDate = fiscalDateRange.slice(1)

      return [fiscalDate, '<']
    }

    const fiscalDates = fiscalDateRange.split(';')

    return [fiscalDates]
  }
}

Plugin.implementedFunctions = implementedFunctions
Plugin.aliases = aliases
