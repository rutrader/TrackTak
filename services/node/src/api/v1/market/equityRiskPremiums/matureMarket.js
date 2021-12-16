import express from 'express'
import readFile from './readFile'

const router = express.Router()

router.get('/', async (_, res) => {
  const equityRiskPremiums = await readFile()

  const matureMarketEquityRiskPremium = equityRiskPremiums.find(
    x => x.countryISO === 'US'
  ).equityRiskPremium

  res.send({
    value: matureMarketEquityRiskPremium
  })
})

export default router
