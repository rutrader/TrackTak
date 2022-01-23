import express from 'express'
import { getFundamentals } from '../../eodHistoricalData/eodAPI'
import readFile from './readFile'

const router = express.Router()

router.get('/:ticker', async (req, res) => {
  const ticker = req.params.ticker
  const field = req.query.field

  const { general } = await getFundamentals(ticker, {
    filter: 'General::CountryISO,General::GicSubIndustry,General::Industry'
  })

  const isUSStock = general.countryISO === 'US'
  const industryAverages = await readFile(isUSStock)

  // Some stocks do not have a gicSubIndustry so fallback to industry for them
  const companyIndustry = industryAverages.find(
    x =>
      x.gicSubIndustry.some(i => i === general.gicSubIndustry) ||
      x.industry.some(i => i === general.industry)
  )

  let value = {
    ...companyIndustry,
    industry: companyIndustry.industry?.join(),
    gicSubIndustry: companyIndustry.gicSubIndustry?.join()
  }

  if (field) {
    value = value[field]
  }

  res.send({
    value
  })
})

export default router
