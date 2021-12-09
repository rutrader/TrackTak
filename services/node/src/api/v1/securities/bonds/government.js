import express from 'express'
import { getGovernmentBond } from './bondApi'

const router = express.Router()

router.get('/:code', async (req, res) => {
  const value = await getGovernmentBond(req.params.code, req.query)

  res.send({ value })
})

export default router
