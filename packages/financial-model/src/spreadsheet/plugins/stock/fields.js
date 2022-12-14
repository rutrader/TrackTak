import { allStatements } from './financialStatementKeys'

export const financialStatementFields = [
  'incomeStatement',
  'balanceSheet',
  'cashFlowStatement'
]

export const financialFields = [
  ...financialStatementFields,
  ...allStatements.map(x => x.field)
]

export const infoFields = [
  'code',
  'type',
  'name',
  'exchange',
  'currencyCode',
  'currencyName',
  'currencySymbol',
  'countryName',
  'countryISO',
  'ISIN',
  'CUSIP',
  'CIK',
  'employerIdNumber',
  'fiscalYearEnd',
  'IPODate',
  'internationalDomestic',
  'sector',
  'industry',
  'gicSector',
  'gicGroup',
  'gicIndustry',
  'gicSubIndustry',
  'homeCategory',
  'isDelisted',
  'description',
  'address',
  'addressData',
  'listings',
  'officers',
  'phone',
  'webURL',
  'logoURL',
  'fullTimeEmployees',
  'updatedAt',
  'mostRecentQuarter',
  'wallStreetTargetPrice',
  'sharesFloat',
  'percentInsiders',
  'percentInstitutions',
  'sharesShort',
  'sharesShortPriorMonth',
  'shortRatio',
  'shortPercentOutstanding',
  'shortPercentFloat'
]

export const industryAverageFields = [
  'numberOfFirms',
  'annualAverageCAGRLastFiveYears',
  'preTaxOperatingMarginUnadjusted',
  'afterTaxROIC',
  'averageEffectiveTaxRate',
  'unleveredBeta',
  'equityLeveredBeta',
  'costOfEquity',
  'standardDeviationInStockPrices',
  'preTaxCostOfDebt',
  'marketDebt/Capital',
  'costOfCapital',
  'sales/Capital',
  'EV/Sales',
  'EV/EBITDA',
  'EV/EBIT',
  'price/Book',
  'trailingPE',
  'nonCashWCAsPercentageOfRevenues',
  'CAPEXAsAPercentageOfRevenues',
  'netCAPEXAsAPercentageOfRevenues',
  'reinvestmentRate',
  'ROE',
  'dividendPayoutRatio',
  'equityReinvestmentRate',
  'preTaxOperatingMarginLeaseAndR&DAdjusted',
  'gicSubIndustry',
  'industry'
]

export const ratioFields = ['interestCoverage']

export const outstandingSharesFields = ['date', 'shares']
