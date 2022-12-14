import express from 'express'
import readFile from './readFile'

const router = express.Router()

router.get('/:type', async (req, res) => {
  const type = req.params.type
  const field = req.query.field
  const industryAverages = await readFile(type === 'US')

  let value = industryAverages.map(industryAverage => {
    return {
      ...industryAverage,
      industry: industryAverage.industry?.join(),
      gicSubIndustry: industryAverage.gicSubIndustry?.join()
    }
  })

  if (field) {
    value = industryAverages.map(industryAverage => industryAverage[field])
  }

  res.send({
    value
  })
})

export default router
