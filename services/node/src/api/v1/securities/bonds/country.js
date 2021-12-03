import express from 'express'
import { getCountryBond } from './bondApi'

const router = express.Router()

router.get('/:code', async (req, res) => {
  const value = await getCountryBond(req.params.code, req.query)

  res.send({ value })
})

export default router
