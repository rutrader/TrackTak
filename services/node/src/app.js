import './dotEnvConfig'
import express from 'express'
import cors from 'cors'
import api from './api'
import auth, { excludeStripeWebhookJSON } from './middleware/auth'
import Stripe from 'stripe'
import { CURRENT_PLAN_ENDPOINT } from './shared/constants'
import { getUserDetails } from './cognito/cognitoClient'
import dayjs from 'dayjs'

const app = express()
const stripe = Stripe(process.env.STRIPE_AUTH_SECRET_KEY)

app.use(express.static('public'))
app.use(excludeStripeWebhookJSON(express.json({ limit: '16mb' })))

app.use(cors())

app.use(
  cors({
    origin: [process.env.DOMAIN_URL, process.env.APP_SUBDOMAIN_URL],
    optionsSuccessStatus: 204
  })
)

app.get('/api/v1/fundamentals/:ticker', async (req, res) => {
  const value = await api.getFundamentals(req.params.ticker, req.query)

  res.send({ value })
})

app.get('/api/v1/prices/:ticker', async (req, res) => {
  const value = await api.getPrices(req.params.ticker, req.query)

  res.send({ value })
})

app.get('/api/v1/eur-base-exchange-rate/:code', async (req, res) => {
  const value = await api.getEURBaseExchangeRate(req.params.code, req.query)

  res.send({ value })
})

app.get(
  '/api/v1/exchange-rate/:baseCurrency/:quoteCurrency',
  async (req, res) => {
    const value = await api.getExchangeRate(
      req.params.baseCurrency,
      req.params.quoteCurrency,
      req.query
    )

    res.send({ value })
  }
)

app.get('/api/v1/exchange-symbol-list/:code', async (req, res) => {
  const value = await api.getExchangeSymbolList(req.params.code, req.query)
  res.send({ value })
})

app.get('/api/v1/government-bond/:code', async (req, res) => {
  const value = await api.getGovernmentBond(req.params.code, req.query)
  res.send({ value })
})

app.get('/api/v1/autocomplete-query/:queryString', async (req, res) => {
  const value = await api.getAutocompleteQuery(
    req.params.queryString,
    req.query
  )
  res.send({ value })
})

app.get('/api/v1/financial-data/:id', async (req, res) => {
  const financialData = await api.getFinancialData(req.params.id)

  res.send({ financialData })
})

app.post('/api/v1/financial-data', auth, async (req, res) => {
  let financialData = req.body.financialData

  const financialDataQuery = {
    code: financialData.general.code,
    exchange: financialData.general.exchange,
    updatedAt: financialData.general.updatedAt
  }

  const existingFinancialData = await api.getFinancialDataByQuery(
    financialDataQuery
  )

  if (existingFinancialData) {
    financialData = existingFinancialData
  } else {
    financialData = await api.createFinancialData(financialData)
  }

  if (req.body.spreadsheetId) {
    await api.updateSpreadsheetFinancialData(
      req.body.spreadsheetId,
      financialData._id
    )
  }

  res.send({ financialData })
})

app.get('/api/v1/folders', auth, async (req, res) => {
  const folders = await api.getFolders(req.user.username)

  if (folders.length === 0) {
    const folder = await api.createFolder('Valuations', req.user.username)

    res.send({ folders: [folder] })

    return
  }

  res.send({ folders })
})

app.post('/api/v1/folder', auth, async (req, res) => {
  const folder = await api.createFolder(req.body.name, req.user.username)
  res.send({ folder })
})

app.put('/api/v1/folder/:id', auth, async (req, res) => {
  const folder = await api.updateFolder(req.params.id, req.body.name)
  res.send({ folder })
})

app.delete('/api/v1/folder/:id', auth, async (req, res) => {
  const folder = await api.deleteFolder(req.params.id)
  res.send({ folder })
})

app.put('/api/v1/spreadsheet/:id', auth, async (req, res) => {
  const spreadsheet = await api.updateSpreadsheetFolder(
    req.params.id,
    req.body.folderId
  )
  res.send({ spreadsheet })
})

app.post('/api/v1/spreadsheets', auth, async (req, res) => {
  const financialData = {
    ticker: req.body.ticker
  }
  const spreadsheet = await api.saveSpreadsheet(
    req.body.sheetData,
    req.user.username,
    financialData
  )

  await api.updateSpreadsheetFolder(spreadsheet._id, req.body.folderId)

  res.send({ spreadsheet })
})

app.get('/api/v1/spreadsheets/metadata', auth, async (req, res) => {
  const spreadsheets = await api.getSpreadsheetsMetadata(req.user.username)

  res.send({ spreadsheets })
})

app.get('/api/v1/spreadsheets/:id', auth, async (req, res) => {
  const spreadsheet = await api.getSpreadsheet(req.params.id)
  res.send({ spreadsheet })
})

app.delete('/api/v1/spreadsheets/:id', auth, async (req, res) => {
  await api.deleteSpreadsheet(req.params.id)

  res.send({ id: req.params.id })
})

app.put('/api/v1/spreadsheets', auth, async (req, res) => {
  const spreadsheet = await api.saveSpreadsheet(
    req.body.sheetData,
    req.user.username,
    req.body.financialData,
    req.body._id,
    req.body.createdTimestamp
  )
  res.send({ spreadsheet })
})

const getSubscription = async stripeCustomerId => {
  const customer = await stripe.customers.retrieve(stripeCustomerId, {
    expand: ['subscriptions']
  })
  return (
    customer.subscriptions.data.length > 0 && customer.subscriptions.data[0]
  )
}

const getCustomer = async accessToken => {
  const userDetails = await getUserDetails(accessToken)
  if (!userDetails || !userDetails.email) {
    return null
  }
  const customers = await stripe.customers.list({
    limit: 1,
    email: userDetails.email
  })
  return customers.data.length > 0
    ? customers.data[0]
    : { email: userDetails.email }
}

const getPlanFromSubscription = async subscription => {
  if (subscription) {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      subscription.default_payment_method
    )

    const now = new Date().getTime() / 1000 // to seconds
    const isFrozen = !!(
      subscription.pause_collection &&
      now > subscription.metadata.period_end_at_freeze &&
      now <= subscription.pause_collection.resumes_at
    )

    return {
      periodEnd: isFrozen
        ? subscription.pause_collection.resumes_at * 1000
        : subscription.current_period_end * 1000, // to ms
      priceIds: isFrozen ? [] : subscription.items.data.map(x => x.price.id),
      totalCost:
        subscription.items.data.reduce(
          (sum, x) => (sum += x.price.unit_amount),
          0
        ) / 100,
      paymentCardLast4: paymentMethod && paymentMethod.card.last4,
      paymentCardBrand: paymentMethod && paymentMethod.card.brand,
      isFrozen
    }
  }

  return {
    priceIds: [],
    isFrozen: false
  }
}

app.get(CURRENT_PLAN_ENDPOINT, auth, async (req, res) => {
  try {
    const customer = await getCustomer(req.user.accessToken)
    const subscription = customer.id ? await getSubscription(customer.id) : null
    const plan = await getPlanFromSubscription(subscription)
    res.send(plan)
  } catch (e) {
    console.error(e)
  }
})

app.put(CURRENT_PLAN_ENDPOINT, auth, async (req, res) => {
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
      default:
        const message = `Unknown account state transition ${state} for customer ${customer.id}`
        console.error(message)
        res.status(400).send({
          message
        })
    }
  } else {
    const message = 'Failed to update plan. Customer does not exist.'
    res.status(400).send({
      message
    })
  }
})

app.get('/v1/prices/:id', auth, async (req, res) => {
  const id = req.params.id

  const price = await stripe.prices.retrieve(id)
  res.send({ price })
})

app.post('/api/v1/create-checkout-session', auth, async (req, res) => {
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
    res.status(400)
    return res.send({
      error: {
        message: e.message
      }
    })
  }
})

app.post(
  '/api/v1/stripe-webhook',
  // auth,
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
      case 'checkout.session.completed':
        const eventData = event.data.object
        console.log(
          `Successfully processed payment for customer ${eventData.customer}`
        )
        break
      default:
        console.error(`Unhandled event type ${event.type}`)
    }

    res.sendStatus(200)
  }
)

app.post('/api/v1/create-customer-portal-session', auth, async (req, res) => {
  const returnUrl = `${process.env.APP_SUBDOMAIN_URL}/account-settings`

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: 'cus_KRWrqkdz1yQ8L6',
    return_url: returnUrl
  })

  res.send({ url: portalSession.url })
})

app.get('/', (_, res) => {
  res.sendStatus(200)
})

app.listen(process.env.PORT, async () => {
  console.log(`Server running at 127.0.0.1:${process.env.PORT}/`)
})
