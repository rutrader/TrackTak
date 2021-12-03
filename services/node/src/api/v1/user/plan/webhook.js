import express from 'express'
import stripe from '../../../../shared/stripe'

const router = express.Router()

router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    let event
    const signature = req.headers['stripe-signature']
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error('Webhook signature verification failed.')
      return res.sendStatus(400)
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const eventData = event.data.object
        console.log(
          `Successfully processed payment for customer ${eventData.customer}`
        )
        break
      }
      default:
        console.error(`Unhandled event type ${event.type}`)
    }

    res.sendStatus(200)
  }
)

export default router
