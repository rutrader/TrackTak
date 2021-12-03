import dayjs from 'dayjs'
import express from 'express'
import getCustomer from './getCustomer'
import stripe from '../../../../shared/stripe'
import getSubscription from './getSubscription'
import getPlanFromSubscription from './getPlanFromSubscription'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const customer = await getCustomer(req.user.accessToken)
    const subscription = customer.id ? await getSubscription(customer.id) : null
    const plan = await getPlanFromSubscription(subscription)
    res.send(plan)
  } catch (e) {
    console.error(e)
  }
})

router.put('/', async (req, res) => {
  const customer = await getCustomer(req.user.accessToken)
  const { state, monthsToFreeze } = req.body

  if (customer.id) {
    const subscription = await getSubscription(customer.id)

    switch (state) {
      case 'freeze': {
        const nextPaymentDate = dayjs.unix(subscription.current_period_end)
        const resumesAt = nextPaymentDate.add(monthsToFreeze, 'month').unix()
        const updatedSubscription = await stripe.subscriptions.update(
          subscription.id,
          {
            pause_collection: {
              behavior: 'void',
              resumes_at: resumesAt
            },
            metadata: {
              period_end_at_freeze: subscription.current_period_end
            }
          }
        )
        const plan = await getPlanFromSubscription(updatedSubscription)
        res.send(plan)
        break
      }
      case 'unfreeze': {
        const updatedSubscription = await stripe.subscriptions.update(
          subscription.id,
          {
            pause_collection: ''
          }
        )
        const plan = await getPlanFromSubscription(updatedSubscription)
        res.send(plan)
        break
      }
      case 'cancel': {
        const updatedSubscription = await stripe.subscriptions.del(
          subscription.id
        )
        const plan = await getPlanFromSubscription(updatedSubscription)
        res.send(plan)
        break
      }
      default: {
        const message = `Unknown account state transition ${state} for customer ${customer.id}`
        console.error(message)
        res.status(400).send({
          message
        })
      }
    }
  } else {
    const message = 'Failed to update plan. Customer does not exist.'
    res.status(400).send({
      message
    })
  }
})

router.post('/', async (req, res) => {
  const { lineItems } = req.body

  try {
    const customer = await getCustomer(req.user.accessToken)
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: lineItems,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      automatic_tax: {
        enabled: true
      },
      success_url: `${process.env.APP_SUBDOMAIN_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN_URL}/pricing`,
      ...(customer.id && {
        customer: customer.id
      }),
      ...(!customer.id && {
        customer_email: customer.email
      })
    })
    res.send({ url: session.url })
  } catch (e) {
    res.status(500)
    return res.send({
      error: {
        message: e.message
      }
    })
  }
})

export default router
