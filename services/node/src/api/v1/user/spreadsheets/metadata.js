import express from 'express'
import { getSpreadsheetsMetadata } from './spreadsheetApi'

const router = express.Router()

router.get('/', async (req, res) => {
  const spreadsheets = await getSpreadsheetsMetadata(req.user.username)

  res.send({ spreadsheets })
})

export default router
