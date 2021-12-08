import {
  CellError,
  FunctionPlugin,
  ErrorType,
  SimpleRangeValue
} from '@tracktak/hyperformula'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import { ErrorMessage } from '@tracktak/hyperformula/es/error-message'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { isNil } from 'lodash'
import stockExchanges from './stockExchanges'
import {
  attributesCellError,
  fiscalDateRangeCellError,
  tickerCellError,
  granularityCellError
} from './cellErrors'
import { allAttributes } from './attributes'
import { api } from '@tracktak/common'
import dayjs from 'dayjs'

const exchangesString = stockExchanges.join('|')
const tickerRegex = new RegExp(`^[0-9A-Za-z-]+\\.?(${exchangesString})?$`)

const dateFormatString = '([0-9]{4}/[0-9]{2}(/[0-9]{2})?)'
const fiscalDateRangeRegex = new RegExp(
  `(^(>|<)${dateFormatString}$)|(^${dateFormatString};${dateFormatString}$)`
)

export const implementedFunctions = {
  'STOCK.FINANCIALS': {
    method: 'stockFinancials',
    arraySizeMethod: 'stockFinancialsSize',
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

const getTypeOfStatementToUse = (financials, attribute) => {
  if (!isNil(financials.incomeStatement.ttm[attribute])) {
    return 'incomeStatement'
  }

  if (!isNil(financials.balanceSheet.ttm[attribute])) {
    return 'balanceSheet'
  }

  if (!isNil(financials.cashFlowStatement.ttm[attribute])) {
    return 'cashFlowStatement'
  }
}

export const fundamentalsFilter =
  'General::CountryISO,General::Code,General::Exchange,General::UpdatedAt,Financials::Balance_Sheet,Financials::Income_Statement,Financials::Cash_Flow'

export const getPlugin = financialData => {
  const { financials = {} } = financialData ?? {}
  const { balanceSheet, incomeStatement, cashFlowStatement } = financials

  class StockFinancialsPlugin extends FunctionPlugin {
    stockFinancials(ast, state) {
      const metadata = this.metadata('STOCK.FINANCIALS')

      return this.runAsyncFunction(
        ast.args,
        state,
        metadata,
        async (...args) => {
          const [attribute, ticker, defaultGranularity, fiscalDateRange] = args
          const granularity =
            !isNil(defaultGranularity) && defaultGranularity !== ''
              ? defaultGranularity
              : fiscalDateRange
              ? 'yearly'
              : 'ttm'
          const isAttributeValid = !!allAttributes.find(x => x === attribute)
          const isTickerValid = ticker ? !!ticker.match(tickerRegex) : true
          const isGranularityValid =
            granularity === 'ttm' ||
            granularity === 'quarterly' ||
            granularity === 'yearly'
          const isFiscalDateRangeValid = fiscalDateRange
            ? !!fiscalDateRange.match(fiscalDateRangeRegex)
            : true

          if (!isAttributeValid) {
            return attributesCellError
          }

          if (!isTickerValid) {
            return tickerCellError
          }

          if (!isGranularityValid) {
            return granularityCellError
          }

          if (!isFiscalDateRangeValid) {
            return fiscalDateRangeCellError
          }

          if (isNil(ticker)) {
            if (!financialData) {
              return new CellError(
                ErrorType.LOADING,
                ErrorMessage.FunctionLoading
              )
            }

            return this.getAttributeValues(
              attribute,
              granularity,
              fiscalDateRange,
              financials
            )
          }

          const { data } = await api.getFundamentals(ticker, {
            filter: fundamentalsFilter
          })
          const financials = data.value.financials

          return this.getAttributeValues(
            attribute,
            granularity,
            fiscalDateRange,
            financials
          )
        }
      )
    }
    stockFinancialsSize(_, state) {
      const cellValue = state.formulaVertex?.getCellValue()

      if (
        (!financialData && !state.formulaVertex) ||
        cellValue instanceof CellError
      ) {
        return ArraySize.error()
      }

      if (cellValue instanceof SimpleRangeValue) {
        const arraySize = new ArraySize(cellValue.width(), cellValue.height())

        return arraySize
      }

      return ArraySize.scalar()
    }

    getAttributeValues(attribute, granularity, fiscalDateRange, financials) {
      const statementKey = getTypeOfStatementToUse(financials, attribute)

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

        const values = financials[statementKey][granularity]
          .filter(({ date }) => {
            if (operator === '>') {
              return dayjs(date).isAfter(fiscalDate, dateGranularity)
            }

            if (operator === '<') {
              return dayjs(date).isBefore(fiscalDate, dateGranularity)
            }

            return dayjs(date).isBetween(
              fiscalDate[0],
              fiscalDate[1],
              dateGranularity
            )
          })
          .map(statement => statement[attribute])

        return getSimpleRangeValues(values)
      }

      if (granularity !== 'ttm') {
        const values = financials[statementKey][granularity].map(
          statement => statement[attribute]
        )

        return getSimpleRangeValues(values)
      }

      return financials[statementKey].ttm[attribute]
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

  StockFinancialsPlugin.implementedFunctions = implementedFunctions
  StockFinancialsPlugin.aliases = aliases

  return StockFinancialsPlugin
}
