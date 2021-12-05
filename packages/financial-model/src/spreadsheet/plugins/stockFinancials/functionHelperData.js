import {
  balanceSheetAttributes,
  cashFlowStatementAttributes,
  incomeStatementAttributes
} from './attributes'
import { aliases } from './getPlugin'

const functionHelperData = {
  header: 'STOCK.FINANCIALS',
  headerDescription:
    'Fetches current or historical financial information for a public company.',
  aliases: Object.keys(aliases),
  globalContext:
    'If a global ticker is set here then every S.FIN() function call will fetch data against this ticker unless overridden in the second parameter.',
  exampleUsages: [
    '=S.FIN("revenue")',
    '=S.FIN("revenue", "AMZN")',
    '=S.FIN("revenue", "BP.LSE", "quarterly")',
    '=S.FIN("revenue",,, "2010/01/01;2015/01/01")',
    '=S.FIN("financialStatements",, "annual")'
  ],
  syntax: '=S.FIN(attribute, [ticker], [type], [fiscalDate])',
  optionalElement: {
    syntaxName: '[]',
    description:
      'Indicates an optional parameter. If a parameter is optional it can be skipped with a comma. Example: =S.FIN("revenue",, "annual")'
  },
  syntaxElements: [
    {
      syntaxName: 'attribute',
      description:
        "Required argument. See the 'attributes' section below for the list of parameters that can be given here."
    },
    {
      syntaxName: '[ticker]',
      description:
        'Example: "AAPL", "AAPL.US" or "BP.LSE". When supplied this will override the global ticker set above. For non-us companies you must supply the exchange as well. See the \'exchanges\' section below for the list of valid exchanges that can be given here.'
    },
    {
      syntaxName: '[type]',
      description:
        'Accepts either "ttm", "quarterly" or "annual". Defaults to ttm (trailing twelve months) if the [fiscalDate] parameter is not given, else it will default to "annual". Non-us stocks do not support "quarterly".'
    },
    {
      syntaxName: '[fiscalDate]',
      description:
        'Example: ">2010/01/01" (more than), "<2020/01/01" (less than) or "2010/01/01;2015/01/01" (between).'
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
