import express from 'express'
import convertPenceToGBPIfNeeded from '../../../../shared/convertPenceToGBPIfNeeded'
import { getFundamentals } from './eodAPI'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const value = await getFundamentals(req.params.ticker, req.query)

  res.send({ value: convertPenceToGBPIfNeeded(value) })
})

export default router
