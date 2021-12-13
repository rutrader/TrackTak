import express from 'express'
import { getFundamentals } from './stockApi'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const value = await getFundamentals(req.params.ticker, req.query)

  res.send({ value })
})

export default router
