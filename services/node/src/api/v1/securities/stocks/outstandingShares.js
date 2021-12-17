import express from 'express'
import { getOutstandingShares } from './stockApi'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const value = await getOutstandingShares(req.params.ticker, req.query)

  res.send({ value })
})

export default router
