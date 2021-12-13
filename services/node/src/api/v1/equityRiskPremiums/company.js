import express from 'express'
import { getFundamentals } from '../securities/stocks/stockApi'
import readFile from './readFile'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const ticker = req.params.ticker
  const field = req.query.field

  const countryISO = await getFundamentals(ticker, {
    filter: 'General::CountryISO'
  })

  const countryEquityRiskPremiums = await readFile()

  // Some stocks do not have a gicSubIndustry so fallback to industry for them
  const countryEquityRiskPremium = countryEquityRiskPremiums.find(
    x => x.countryISO === countryISO
  )

  let value = countryEquityRiskPremium

  if (field) {
    value = countryEquityRiskPremium[field]
  }

  res.send({
    value
  })
})

export default router
