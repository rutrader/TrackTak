import express from 'express'
import { updateSpreadsheetFinancialData } from '../spreadsheets/spreadsheetApi'
import {
  createFinancialData,
  getFinancialData,
  getFinancialDataByQuery
} from './financialDataApi'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const financialData = await getFinancialData(req.params.id)

  res.send({ financialData })
})

router.post('/', async (req, res) => {
  let financialData = req.body.financialData

  const financialDataQuery = {
    code: financialData.general.code,
    exchange: financialData.general.exchange,
    updatedAt: financialData.general.updatedAt
  }

  const existingFinancialData = await getFinancialDataByQuery(
    financialDataQuery
  )

  if (existingFinancialData) {
    financialData = existingFinancialData
  } else {
    financialData = await createFinancialData(financialData)
  }

  if (req.body.spreadsheetId) {
    await updateSpreadsheetFinancialData(
      req.body.spreadsheetId,
      financialData._id
    )
  }

  res.send({ financialData })
})

export default router
