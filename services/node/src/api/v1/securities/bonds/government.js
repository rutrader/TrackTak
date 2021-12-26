import express from 'express'
import { getGovernmentBond } from './bondApi'

const router = express.Router()

router.get('/:countryISO', async (req, res) => {
  const value = await getGovernmentBond(req.params.countryISO, req.query)

  res.send({ value })
})

export default router
