import express from 'express'
import stripe from '../../../shared/stripe'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const price = await stripe.prices.retrieve(id)

  res.send({ price })
})

export default router
