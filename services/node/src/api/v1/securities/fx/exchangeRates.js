import express from 'express'
import { getEURBaseExchangeRate, getExchangeRate } from './fxApi'

const router = express.Router()

router.get('/euro/:quoteCurrency', async (req, res) => {
  const value = await getEURBaseExchangeRate(
    req.params.quoteCurrency,
    req.query
  )

  res.send({ value })
})

router.get('/:baseCurrency/:quoteCurrency', async (req, res) => {
  const value = await getExchangeRate(
    req.params.baseCurrency,
    req.params.quoteCurrency,
    req.query
  )

  res.send({ value })
})

export default router
