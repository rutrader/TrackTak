import express from 'express'
import readFile from './readFile'

const router = express.Router()

router.get('/', async (req, res) => {
  const field = req.query.field
  const equityRiskPremiums = await readFile()

  let value = equityRiskPremiums

  if (field) {
    value = equityRiskPremiums.map(industryAverage => industryAverage[field])
  }

  res.send({
    value
  })
})

router.get('/:countryISO', async (req, res) => {
  const countryISO = req.params.countryISO
  const field = req.query.field
  const equityRiskPremiums = await readFile()

  const countryEquityRiskPremium = equityRiskPremiums.find(
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
