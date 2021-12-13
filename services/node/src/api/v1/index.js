import express from 'express'
import securities from './securities'
import equityRiskPremiumCountries from './equityRiskPremiums/countries'
import companyEquityRiskPremium from './equityRiskPremiums/company'
import prices from './plans/prices'
import spreadsheetTemplates from './spreadsheetTemplates'
import user from './user'

const router = express.Router()

router.use('/plans/prices', prices)
router.use('/securities', securities)
router.use('/equity-risk-premiums/countries', equityRiskPremiumCountries)
router.use('/equity-risk-premiums', companyEquityRiskPremium)
router.use('/spreadsheet-templates', spreadsheetTemplates)
router.use('/user', user)

export default router
