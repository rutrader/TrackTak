import {
  balanceSheet,
  cashFlowStatement,
  incomeStatement
} from './financialStatements'

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

const riskPremiumsAndBetas = [
  'unleveredBeta',
  'equityLeveredBeta',
  'riskFreeRate',
  'equityRiskPremium',
  'adjDefaultSpread',
  'matureMarketEquityRiskPremium'
]

const general = [
  'description',
  'currencyCode',
  'code',
  'exchange',
  'name',
  'price',
  'sharesOutstanding',
  'industryName'
]

const other = [
  'bookValueOfEquity',
  'bookValueOfDebt',
  'investedCapital',
  'salesToCapitalRatio',
  'marginalTaxRate',
  'standardDeviationInStockPrices',
  'marketCapitalization',
  'pastThreeYearsAverageEffectiveTaxRate',
  'costOfCapital',
  'afterTaxROIC',
  'preTaxOperatingMarginUnadjusted',
  'annualAverageCAGRLastFiveYears'
]

export const incomeStatementAttributes =
  getMappedFilteredArrayAttributes(incomeStatement)

export const balanceSheetAttributes =
  getMappedFilteredArrayAttributes(balanceSheet)

export const cashFlowStatementAttributes =
  getMappedFilteredArrayAttributes(cashFlowStatement)

export const riskPremiumsAndBetasAttributes =
  getMappedArrayAttributes(riskPremiumsAndBetas)

export const generalAttributes = getMappedArrayAttributes(general)

export const otherAttributes = getMappedArrayAttributes(other)

const finFunctionHelperData = {
  header: 'FINANCIAL - FIN (beta)',
  headerDescription:
    'Fetches current or historical financial information for a public company.',
  globalContext:
    'If a global ticker is set here then every FIN function call will fetch data against this ticker unless overridden in the second parameter.',
  exampleUsages: [
    '=FIN("revenue")',
    '=FIN("revenue", "AMZN")',
    '=FIN("revenue", "BP.LSE", "quarterly")',
    '=FIN("revenue",,, "2010/01/01;2015/01/01")',
    '=FIN("financialStatements",, "annual")'
  ],
  syntax: '=FIN(attribute, [ticker], [type], [fiscalDate])',
  optionalElement: {
    syntaxName: '[]',
    description:
      'Indicates an optional parameter. If a parameter is optional it can be skipped with a comma. Example: =FIN("revenue",, "annual")'
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
      header: 'General',
      attributeNames: generalAttributes
    },
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
    },
    {
      header: 'Risk Premiums and Betas',
      attributeNames: riskPremiumsAndBetasAttributes
    },
    {
      header: 'Other',
      attributeNames: otherAttributes
    }
  ]
}

export default finFunctionHelperData
