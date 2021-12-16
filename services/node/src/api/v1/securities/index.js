import express from 'express'
import autocomplete from './autocomplete'
import government from './bonds/government'
import exchangeRates from './fx/exchangeRates'
import prices from './stocks/prices'
import financials from './stocks/financials'
import outstandingShares from './stocks/outstandingShares'
import ratios from './stocks/ratios'
import industryAverages from './stocks/industryAverages'
import companyIndustryAverage from './stocks/industryAverages/company'
import companyEquityRiskPremium from './stocks/equityRiskPremiums/company'
import companyCreditRatingInterestSpreads from './stocks/creditRatingInterestSpreads/company'
import eodHistoricalDataEOD from './eodHistoricalData/eod'
import eodHistoricalDataFundamentals from './eodHistoricalData/fundamentals'

const router = express.Router()

router.use('/autocomplete', autocomplete)
router.use('/bonds/government', government)
router.use('/fx/exchange-rates', exchangeRates)
router.use('/eod-historical-data/eod', eodHistoricalDataEOD)
router.use('/eod-historical-data/fundamentals', eodHistoricalDataFundamentals)
router.use('/stocks/prices', prices)
router.use('/stocks/financials', financials)
router.use('/stocks/outstanding-shares', outstandingShares)
router.use('/stocks/ratios', ratios)
router.use('/stocks/industry-averages', industryAverages)
router.use('/stocks/industry-averages/company', companyIndustryAverage)
router.use('/stocks/equity-risk-premiums/company', companyEquityRiskPremium)
router.use(
  '/stocks/credit-rating-interest-spreads/company',
  companyCreditRatingInterestSpreads
)

export default router
