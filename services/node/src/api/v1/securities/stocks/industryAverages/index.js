import express from 'express'
import readIndustryAveragesFile from './readIndustryAveragesFile'

const router = express.Router()

router.get('/:type', async (req, res) => {
  const type = req.params.type
  const industryAverages = await readIndustryAveragesFile(type === 'US')

  res.send({
    value: industryAverages
  })
})

export default router
