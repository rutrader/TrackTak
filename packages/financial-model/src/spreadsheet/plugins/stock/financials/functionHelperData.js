import {
  balanceSheet,
  cashFlowStatement,
  incomeStatement
} from '../financialStatements'
import { financialStatementFields } from './fields'
import { aliases } from './plugin'

const functionHelperData = {
  header: 'STOCK.FINANCIALS',
  headerDescription:
    'Fetches current or historical financial information for a public company.',
  aliases: Object.keys(aliases),
  exampleUsages: [
    '=S.FIN("AMZN", "revenue")',
    '=S.FIN("BP.LSE", "revenue", "quarterly")',
    '=S.FIN("AAPL", "revenue",,, "2010/01;2015/01")',
    '=S.FIN("KME.AU", "incomeStatement",, "yearly")'
  ],
  syntax: '=S.FIN(ticker, field, [granularity], [fiscalDateRange])',
  optionalElement: {
    syntaxName: '[]',
    description:
      'Indicates an optional parameter. If a parameter is optional it can be skipped with a comma. Example: =S.FIN("revenue",, "yearly")'
  },
  syntaxElements: [
    {
      syntaxName: 'ticker',
      description:
        'Example: "AAPL", "BP.LSE", "KME.AU" etc. For non-us companies you must supply the exchange as well. See the \'exchanges\' section below for the list of valid exchanges that can be given here.'
    },
    {
      syntaxName: 'field',
      description:
        "See the 'fields' section below for the list of parameters that can be given here."
    },
    {
      syntaxName: '[granularity]',
      description:
        'Accepts either "ttm", "quarterly" or "yearly". Defaults to ttm (trailing twelve months) if the [fiscalDateRange] parameter is not given, else it will default to "yearly". Non-us stocks do not support "quarterly".'
    },
    {
      syntaxName: '[fiscalDateRange]',
      description:
        'Example: ">2010/01" (more than), "<2020/01" (less than) or "2010/01;2015/01" (between).'
    }
  ],
  fields: [
    {
      header: 'Full Statements',
      fieldNames: financialStatementFields
    },
    {
      header: 'Income Statement',
      fieldNames: incomeStatement
    },
    {
      header: 'Balance Sheet',
      fieldNames: balanceSheet
    },
    {
      header: 'Cash Flow Statement',
      fieldNames: cashFlowStatement
    }
  ]
}

export default functionHelperData
