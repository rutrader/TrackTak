import express from 'express'
import autocomplete from './autocomplete'
import government from './bonds/government'
import exchangeRates from './fx/exchangeRates'
import eod from './stocks/eod'
import fundamentals from './stocks/fundamentals'
import industryAverages from './stocks/industryAverages'
import companyIndustryAverage from './stocks/industryAverages/company'
import companyEquityRiskPremium from './stocks/equityRiskPremiums/company'

const router = express.Router()

router.use('/autocomplete', autocomplete)
router.use('/bonds/government', government)
router.use('/fx/exchange-rates', exchangeRates)
router.use('/stocks/eod', eod)
router.use('/stocks/fundamentals', fundamentals)
router.use('/stocks/industry-averages', industryAverages)
router.use('/stocks/industry-averages/company', companyIndustryAverage)
router.use('/stocks/equity-risk-premiums/company', companyEquityRiskPremium)

export default router
