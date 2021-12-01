import {
  balanceSheet,
  cashFlowStatement,
  incomeStatement
} from './financialStatements'

const getMappedArrayAttributes = financialSecurityAttribute => {
  return financialSecurityAttribute.map(attribute => {
    return `"${attribute}"`
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
  codeSyntaxUsage: [
    '=FIN("revenue")',
    '=FIN("revenue",,"01/01/2000")',
    '=FIN(B2, B3)'
  ],
  codeSyntaxElements: [
    {
      codeSyntax: '=FIN(attribute, [startDate], [endDate])',
      values: [
        {
          syntaxName: '[]',
          description:
            'indicates optional. If a parameter is optional it can be skipped with a comma. Example: =FIN("revenue",,"01/01/2021")'
        },
        {
          syntaxName: 'attribute',
          description:
            '1st argument is required. Fetches current or historical securities information from Tracktak.'
        },
        {
          syntaxName: '[startDate]',
          description:
            '2nd argument is optional. The start date when fetching historical data.'
        },
        {
          syntaxName: '[endDate]',
          description:
            '3rd argument is optional. The end date when fetching historical data.'
        },
        {
          syntaxName: '[mm/dd/yyy]',
          description: 'The start date and end date format.'
        }
      ]
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
    },
    {
      header: 'Risk Premiums and Betas',
      attributeNames: riskPremiumsAndBetasAttributes
    },
    {
      header: 'General',
      attributeNames: generalAttributes
    },
    {
      header: 'Other',
      attributeNames: otherAttributes
    }
  ]
}

export default finFunctionHelperData
