import express from 'express'
import stripe from '../../../../shared/stripe'
import getCustomer from './getCustomer'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const returnUrl = `${process.env.APP_SUBDOMAIN_URL}/account-settings`
    const customer = await getCustomer(req.user.accessToken)

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: returnUrl
    })

    res.send({ url: portalSession.url })
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
