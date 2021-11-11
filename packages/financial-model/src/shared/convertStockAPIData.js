import makeConvertCurrency from './makeConvertCurrency'
import getIncomeStatements from './getIncomeStatements'
import getBalanceSheets from './getBalanceSheet'
import getCashFlowStatements from './getCashFlowStatement'
import getSharesOutstanding from './getSharesOutstanding'
import getPrice from './getPrice'
import getThreeAverageYearsEffectiveTaxRate from './getThreeAverageYearsEffectiveTaxRate'
import getCurrentEquityRiskPremium from './getCurrentEquityRiskPremium'
import getRiskFreeRate from './getRiskFreeRate'
import getCurrentIndustry from './getCurrentIndustry'
import getInterestCoverage from './getInterestCoverage'
import getInterestSpread from './getInterestSpread'
import getEstimatedCostOfDebt from './getEstimatedCostOfDebt'
import matureMarketEquityRiskPremium from './matureMarketEquityRiskPremium'
import convertSubCurrencyToCurrency from './convertSubCurrencyToCurrency'
import getSymbolFromCurrency from 'currency-symbol-map'

const convertStockAPIData = (
  fundamentals,
  exchangeRates,
  priceLastClose,
  governmentBondTenYearYield
) => {
  const convertCurrency = makeConvertCurrency(exchangeRates)
  const incomeStatements = getIncomeStatements(fundamentals, convertCurrency)
  const balanceSheets = getBalanceSheets(
    fundamentals,
    incomeStatements,
    convertCurrency
  )
  const cashFlowStatements = getCashFlowStatements(
    fundamentals,
    convertCurrency
  )
  const price = getPrice(fundamentals, priceLastClose)
  const sharesOutstanding = getSharesOutstanding(fundamentals, price)
  const pastThreeYearsAverageEffectiveTaxRate =
    getThreeAverageYearsEffectiveTaxRate(fundamentals)
  const currentEquityRiskPremium = getCurrentEquityRiskPremium(fundamentals)
  const riskFreeRate = getRiskFreeRate(
    governmentBondTenYearYield,
    currentEquityRiskPremium
  )
  const currentIndustry = getCurrentIndustry(fundamentals)
  const interestCoverage = getInterestCoverage(incomeStatements)
  const lastExchangeRate = exchangeRates?.[0]?.close ?? 1
  const interestSpread = getInterestSpread(
    fundamentals,
    interestCoverage,
    exchangeRates
  )
  const estimatedCostOfDebt = getEstimatedCostOfDebt(
    riskFreeRate,
    interestSpread,
    currentEquityRiskPremium
  )

  const currencyCode = convertSubCurrencyToCurrency(
    fundamentals.general.currencyCode
  )
  const currencySymbol = getSymbolFromCurrency(currencyCode)

  return {
    general: {
      ...fundamentals.general,
      currencyCode,
      currencySymbol
    },
    financialStatements: {
      incomeStatements,
      balanceSheets,
      cashFlowStatements
    },
    highlights: {
      ...fundamentals.highlights,
      sharesOutstanding
    },
    price,
    pastThreeYearsAverageEffectiveTaxRate,
    currentEquityRiskPremium,
    currentIndustry,
    riskFreeRate,
    estimatedCostOfDebt,
    exchangeRates,
    governmentBondTenYearYield,
    matureMarketEquityRiskPremium,
    lastExchangeRate
  }
}

export default convertStockAPIData
