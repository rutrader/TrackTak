import express from 'express'
import fs from 'fs/promises'
import getConvertedIndustryAverages from './getConvertedIndustryAverages'

const router = express.Router()

router.get('/:type', async (req, res) => {
  const type = req.params.type
  const fileName =
    type === 'US' ? 'industryAveragesUS' : 'industryAveragesGlobal'

  const industryAverages = await fs.readFile(
    new URL(`./${fileName}.json`, import.meta.url),
    'utf8'
  )

  res.send({
    value: getConvertedIndustryAverages(JSON.parse(industryAverages))
  })
})

export default router
