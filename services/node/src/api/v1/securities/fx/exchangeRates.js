import express from 'express'
import { getExchangeRate } from './fxApi'

const router = express.Router()

router.get('/:baseCurrency/:quoteCurrency', async (req, res) => {
  const value = await getExchangeRate(
    req.params.baseCurrency,
    req.params.quoteCurrency,
    req.query
  )

  res.send({ value })
})

export default router
