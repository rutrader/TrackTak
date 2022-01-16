import express from 'express'
import auth from '../../../middleware/auth'
import plan from './plan'
import portalSession from './plan/portalSession'
import webhook from './plan/webhook'
import spreadsheets from './spreadsheets'
import spreadsheetsMetadata from './spreadsheets/metadata'

const router = express.Router()

router.use('/', auth)
router.use('/plan/portal-session', portalSession)
router.use('/plan/webhook', webhook)
router.use('/plan', plan)
router.use('/spreadsheets/metadata', spreadsheetsMetadata)
router.use('/spreadsheets', spreadsheets)

export default router
