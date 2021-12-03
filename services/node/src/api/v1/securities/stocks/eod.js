import express from 'express'
import { getEOD } from './stockApi'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const value = await getEOD(req.params.ticker, req.query)

  res.send({ value })
})

export default router
