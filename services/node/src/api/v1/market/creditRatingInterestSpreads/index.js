import express from 'express'
import { getFieldValue } from '../../securities/helpers'
import readFile from './readFile'

const router = express.Router()

router.get('/', async (req, res) => {
  const field = req.query.field
  const creditRatingInterestSpreads = await readFile()

  let value = creditRatingInterestSpreads

  if (field) {
    value = creditRatingInterestSpreads.map(
      creditRatingInterestSpread => creditRatingInterestSpread[field]
    )
  }

  res.send({
    value: getFieldValue(value, true)
  })
})

export default router
