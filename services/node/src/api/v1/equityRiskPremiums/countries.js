import express from 'express'
import readFile from './readFile'

const router = express.Router()

router.get('/', async (req, res) => {
  const field = req.query.field
  const countryEquityRiskPremiums = await readFile()

  let value = countryEquityRiskPremiums

  if (field) {
    value = countryEquityRiskPremiums.map(
      industryAverage => industryAverage[field]
    )
  }

  res.send({
    value
  })
})

export default router
