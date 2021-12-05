import { CellError, FunctionPlugin, ErrorType } from '@tracktak/hyperformula'
import { ArraySize } from '@tracktak/hyperformula/es/ArraySize'
import { ErrorMessage } from '@tracktak/hyperformula/es/error-message'
import { ArgumentTypes } from '@tracktak/hyperformula/es/interpreter/plugin/FunctionPlugin'
import { isNil } from 'lodash'
import stockExchanges from './stockExchanges'
import {
  attributesCellError,
  fiscalDateCellError,
  tickerCellError,
  typeCellError
} from './cellErrors'
import { allAttributes } from './attributes'

const exchangesString = stockExchanges.join('|')
const tickerRegex = new RegExp(`^[0-9A-Za-z-]+\\.?(${exchangesString})?$`)

const dateFormatString = '([0-9]{4}/[0-9]{2}/[0-9]{2})'
const fiscalDateRegex = new RegExp(
  `(^(>|<)${dateFormatString}$)|(^${dateFormatString};${dateFormatString}$)`
)

export const implementedFunctions = {
  'STOCK.FINANCIALS': {
    method: 'stockFinancials',
    arraySizeMethod: 'stockFinancialsSize',
    parameters: [
      {
        argumentType: ArgumentTypes.STRING
      },
      {
        argumentType: ArgumentTypes.STRING,
        optionalArg: true
      },
      { argumentType: ArgumentTypes.STRING, defaultValue: 'ttm' },
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

export const getPlugin = financialData => {
  const { financials = {} } = financialData ?? {}
  const { balanceSheet, incomeStatement, cashFlowStatement } = financials
  // const {
  //   financialStatements = {},
  //   currentEquityRiskPremium,
  //   currentIndustry,
  //   general,
  //   highlights,
  //   ...data
  // } = financialData ?? {}

  // delete data.exchangeRates

  // const {
  //   incomeStatements = defaultStatement,
  //   balanceSheets = defaultStatement,
  //   cashFlowStatements = defaultStatement
  // } = financialStatements

  // const dates = getDatesFromStatements(incomeStatements)

  // const statements = [
  //   [null, ...dates],
  //   ['Income Statement'],
  //   ...getStatements(incomeStatements, incomeStatement),
  //   [''],
  //   ['Balance Sheet'],
  //   ...getStatements(balanceSheets, balanceSheet),
  //   [''],
  //   ['Cash Flow Statement'],
  //   ...getStatements(cashFlowStatements, cashFlowStatement)
  // ]

  // const ttmData = {
  //   ...incomeStatements.ttm,
  //   ...balanceSheets.ttm,
  //   ...cashFlowStatements.ttm,
  //   ...currentEquityRiskPremium,
  //   ...currentIndustry,
  //   ...general,
  //   ...highlights,
  //   ...data
  // }

  // const historicalDataArrays = {
  //   incomeStatements: {
  //     yearly: Object.values(incomeStatements.yearly ?? {})
  //   },
  //   balanceSheets: {
  //     yearly: Object.values(balanceSheets.yearly ?? {})
  //   },
  //   cashFlowStatements: {
  //     yearly: Object.values(cashFlowStatements.yearly ?? {})
  //   }
  // }

  const getTypeOfStatementToUse = attribute => {
    if (!isNil(incomeStatement.ttm[attribute])) {
      return 'incomeStatement'
    }

    if (!isNil(balanceSheet.ttm[attribute])) {
      return 'balanceSheet'
    }

    if (!isNil(cashFlowStatement.ttm[attribute])) {
      return 'cashFlowStatement'
    }
  }

  // const getYearlyValues = (attribute, statementType, startDate, endDate) => {
  //   const startDateDayjs = dayjs(startDate)
  //   const endDateDayjs = dayjs(endDate)

  //   return historicalDataArrays[statementType].yearly
  //     .filter(({ date }) => {
  //       return dayjs(date).isBetween(startDateDayjs, endDateDayjs, 'day', '[]')
  //     })
  //     .map(datum => {
  //       let value = datum[attribute]

  //       if (attribute === 'date') {
  //         value = dayjs(value).format(dateFormat)
  //       }

  //       return value
  //     })
  // }

  class StockFinancialsPlugin extends FunctionPlugin {
    stockFinancials(ast, state) {
      const args = ast.args
      const metadata = this.metadata('STOCK.FINANCIALS')

      return this.runFunction(
        args,
        state,
        metadata,
        (attribute, ticker, type, fiscalDate) => {
          const isAttributeValid = !!allAttributes.find(x => x === attribute)
          const isTickerValid = ticker ? !!ticker.match(tickerRegex) : true
          const isTypeValid =
            type === 'ttm' || type === 'quarterly' || type === 'annual'
          const isFiscalDateValid = fiscalDate
            ? !!fiscalDate.match(fiscalDateRegex)
            : true

          if (!isAttributeValid) {
            return attributesCellError
          }

          if (!isTickerValid) {
            return tickerCellError
          }

          if (!isTypeValid) {
            return typeCellError
          }

          if (!isFiscalDateValid) {
            return fiscalDateCellError
          }

          if (isNil(ticker)) {
            if (!financialData) {
              return new CellError(
                ErrorType.LOADING,
                ErrorMessage.FunctionLoading
              )
            }
            const statementKey = getTypeOfStatementToUse(attribute)

            if (args.length === 1) {
              return financials[statementKey].ttm[attribute]
            }
          } else {
            return undefined
          }

          return undefined
        }
      )
      // const attribute = args[0].value
      // // TODO: Add proper error checking here later
      // if (args.length === 1) {
      //   if (attribute === 'currencyCode') {
      //     const currencyCode = ttmData[attribute]
      //     return convertSubCurrencyToCurrency(currencyCode)
      //   }
      //   if (attribute === 'financialStatements') {
      //     return SimpleRangeValue.onlyValues(statements)
      //   }
      //   return ttmData[attribute] ?? ''
      // }
      // const startDate = args[1].value
      // const statementType = getTypeOfStatementToUse(attribute)
      // if (args.length === 2) {
      //   if (attribute === 'description') {
      //     return ttmData[attribute]
      //   }
      //   return (
      //     historicalDataArrays[statementType].yearly[startDate][attribute] ?? ''
      //   )
      // }
      // const endDate = args[2].value
      // if (args.length === 3) {
      //   return SimpleRangeValue.onlyValues([
      //     getYearlyValues(attribute, statementType, startDate, endDate)
      //   ])
      // }
    }
    stockFinancialsSize({ args }) {
      if (!financialData) {
        return ArraySize.scalar()
      }

      // const attribute = args[0].value
      // const statementType = getTypeOfStatementToUse(attribute)
      // const startDate = args[1] ? args[1].value : null
      // const endDate = args[2] ? args[2].value : null

      // if (attribute === 'financialStatements') {
      //   return ArraySize.fromArray(statements)
      // }

      // if (args.length === 3) {
      //   const yearlyValues = getYearlyValues(
      //     attribute,
      //     statementType,
      //     startDate,
      //     endDate
      //   )

      //   return ArraySize.fromArray([yearlyValues])
      // }

      return ArraySize.scalar()
    }
  }

  StockFinancialsPlugin.implementedFunctions = implementedFunctions
  StockFinancialsPlugin.aliases = aliases

  return StockFinancialsPlugin
}
