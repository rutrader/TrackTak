import './dotEnvConfig'
import express from 'express'
import cors from 'cors'
import { excludeStripeWebhookJSON } from './middleware/auth'
import * as database from './database/mongoDbClient'
import api from './api'

database.connect()

const app = express()

app.use(express.static('public'))
app.use(excludeStripeWebhookJSON(express.json({ limit: '16mb' })))

app.use(cors())

app.use(
  cors({
    origin: [process.env.DOMAIN_URL, process.env.APP_SUBDOMAIN_URL],
    optionsSuccessStatus: 204
  })
)

app.use('/api', api)

app.get('/', (_, res) => {
  res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
  console.log(`Server running at 127.0.0.1:${process.env.PORT}/`)
})
