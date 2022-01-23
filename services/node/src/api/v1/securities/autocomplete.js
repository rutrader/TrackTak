import express from 'express'
import { getSecuritiesAutocomplete } from './securitiesApi'

const router = express.Router()

router.get('/:queryString', async (req, res) => {
  const value = await getSecuritiesAutocomplete(
    req.params.queryString,
    req.query
  )

  res.send({ value })
})

export default router
