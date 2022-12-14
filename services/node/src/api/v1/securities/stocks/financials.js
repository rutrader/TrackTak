import express from 'express'
import { getFinancials } from './stockApi'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const value = await getFinancials(req.params.ticker, req.query)

  res.send({ value })
})

export default router
