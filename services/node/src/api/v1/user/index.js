import express from 'express'
import auth from '../../../middleware/auth'
import financialData from './financialData'
import plan from './plan'
import portalSession from './plan/portalSession'
import webhook from './plan/webhook'
import spreadsheets from './spreadsheets'
import spreadsheetsMetadata from './spreadsheets/metadata'

const router = express.Router()

router.use('/', auth)
router.use('/financial-data', financialData)
router.use('/plan', plan)
router.use('/plan/portal-session', portalSession)
router.use('/plan/webhook', webhook)
router.use('/spreadsheets', spreadsheets)
router.use('/spreadsheets/metadata', spreadsheetsMetadata)

export default router
