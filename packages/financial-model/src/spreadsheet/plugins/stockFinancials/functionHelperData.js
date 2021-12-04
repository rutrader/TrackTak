import {
  balanceSheet,
  cashFlowStatement,
  incomeStatement
} from './financialStatements'
import { aliases } from './getPlugin'

const getMappedArrayAttributes = financialSecurityAttribute => {
  return financialSecurityAttribute.map(attribute => {
    return attribute
  })
}

const getMappedFilteredArrayAttributes = financialSecurityAttribute => {
  const filteredAttributes = financialSecurityAttribute.filter(
    element => element
  )

  return getMappedArrayAttributes(filteredAttributes)
}

export const incomeStatementAttributes =
  getMappedFilteredArrayAttributes(incomeStatement)

export const balanceSheetAttributes =
  getMappedFilteredArrayAttributes(balanceSheet)

export const cashFlowStatementAttributes =
  getMappedFilteredArrayAttributes(cashFlowStatement)

const functionHelperData = {
  header: 'STOCK_FINANCIALS',
  headerDescription:
    'Fetches current or historical financial information for a public company.',
  aliases: Object.keys(aliases),
  globalContext:
    'If a global ticker is set here then every S_FIN() function call will fetch data against this ticker unless overridden in the second parameter.',
  exampleUsages: [
    '=S_FIN("revenue")',
    '=S_FIN("revenue", "AMZN")',
    '=S_FIN("revenue", "BP.LSE", "quarterly")',
    '=S_FIN("revenue",,, "2010/01/01;2015/01/01")',
    '=S_FIN("financialStatements",, "annual")'
  ],
  syntax: '=S_FIN(attribute, [ticker], [type], [fiscalDate])',
  optionalElement: {
    syntaxName: '[]',
    description:
      'Indicates an optional parameter. If a parameter is optional it can be skipped with a comma. Example: =S_FIN("revenue",, "annual")'
  },
  syntaxElements: [
    {
      syntaxName: 'attribute',
      description:
        'Required argument. See below for the list of the attributes that can be given here'
    },
    {
      syntaxName: '[ticker]',
      description:
        'Example "AAPL" or "BP.LSE". When supplied this will override the global ticker set above. For non-us companies you must supply the exchange as well.'
    },
    {
      syntaxName: '[type]',
      description:
        'Accepts either "ttm", "quarterly", "annual". Defaults to "ttm" (Trailing Twelve Months). Non-us stocks do not support "quarterly".'
    },
    {
      syntaxName: '[fiscalDate]',
      description:
        'Example "2010/01/01;2015/01/01", ">2010/01/01", "<2020/01/01" or "2020/01/01".'
    }
  ],
  attributes: [
    {
      header: 'Income Statement',
      attributeNames: incomeStatementAttributes
    },
    {
      header: 'Balance Sheet',
      attributeNames: balanceSheetAttributes
    },
    {
      header: 'Cashflow Statement',
      attributeNames: cashFlowStatementAttributes
    }
  ]
}

export default functionHelperData
