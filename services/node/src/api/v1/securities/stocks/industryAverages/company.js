import express from 'express'
import { getFundamentals } from '../stockApi'
import readIndustryAveragesFile from './readIndustryAveragesFile'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const ticker = req.params.ticker
  const field = req.query.field

  const general = await getFundamentals(ticker, {
    filter: 'General'
  })

  const isUSStock = general.countryISO === 'US'
  const industryAverages = await readIndustryAveragesFile(isUSStock)

  // Some stocks do not have a gicSubIndustry so fallback to industry for them
  const companyIndustry = industryAverages.find(
    x =>
      x.gicSubIndustry === general.gicSubIndustry ||
      x.industry === general.industry
  )

  let value = companyIndustry

  if (field) {
    value = companyIndustry[field]
  }

  res.send({
    value
  })
})

export default router
