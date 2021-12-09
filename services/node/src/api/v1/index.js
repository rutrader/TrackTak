import express from 'express'
import securities from './securities'
import prices from './plans/prices'
import spreadsheetTemplates from './spreadsheetTemplates'
import user from './user'

const router = express.Router()

router.use('/plans/prices', prices)
router.use('/securities', securities)
router.use('/spreadsheet-templates', spreadsheetTemplates)
router.use('/user', user)

export default router
