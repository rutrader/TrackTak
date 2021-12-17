import express from 'express'
import securities from './securities'
import equityRiskPremiums from './market/equityRiskPremiums'
import matureMarketEquityRiskPremium from './market/equityRiskPremiums/matureMarket'
import creditRatingInterestSpreads from './market/creditRatingInterestSpreads'
import prices from './plans/prices'
import spreadsheetTemplates from './spreadsheetTemplates'
import user from './user'

const router = express.Router()

router.use('/plans/prices', prices)
router.use('/securities', securities)
router.use('/market/equity-risk-premiums', equityRiskPremiums)
router.use(
  '/market/equity-risk-premiums/mature-market',
  matureMarketEquityRiskPremium
)
router.use(
  '/market/credit-rating-interest-spreads',
  creditRatingInterestSpreads
)
router.use('/spreadsheet-templates', spreadsheetTemplates)
router.use('/user', user)

export default router
