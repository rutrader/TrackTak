import express from 'express'
import { getRatios } from './stockApi'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const value = await getRatios(req.params.ticker, req.query)

  res.send({ value })
})

export default router
