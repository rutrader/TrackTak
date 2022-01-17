import express from 'express'
import {
  createSpreadsheet,
  deleteSpreadsheet,
  getSpreadsheet,
  updateSpreadsheet
} from './spreadsheetApi'

const router = express.Router()

router.post('/', async (req, res) => {
  const spreadsheet = await createSpreadsheet(
    req.body.sheetData,
    req.user.username
  )
  res.send({ spreadsheet })
})

router.put('/', async (req, res) => {
  const spreadsheet = await updateSpreadsheet(
    req.body.sheetData,
    req.user.username,
    req.body._id,
    req.body.createdTimestamp
  )
  res.send({ spreadsheet })
})

router.get('/:id', async (req, res) => {
  const spreadsheet = await getSpreadsheet(req.params.id)

  res.send({ spreadsheet })
})

router.delete('/:id', async (req, res) => {
  await deleteSpreadsheet(req.params.id)

  res.send({ id: req.params.id })
})

export default router
