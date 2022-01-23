import express from 'express'
import { getPrices } from './stockApi'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const value = await getPrices(req.params.ticker, req.query)

  res.send({ value })
})

export default router
