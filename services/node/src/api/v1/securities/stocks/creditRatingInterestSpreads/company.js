import express from 'express'
import {
  getFundamentals,
  getOutstandingShares,
  getPrices,
  getRatios
} from '../stockApi'
import readFile from '../../../market/creditRatingInterestSpreads/readFile'
import { getExchangeRate } from '../../fx/fxApi'
import dayjs from 'dayjs'
import convertSubCurrencyToCurrency from '../../fx/convertSubCurrencyToCurrency'
import { getFieldValue, parseFiscalDateFromRange } from '../../helpers'

const router = express.Router()

const thresholdMarketCapUSD = 5000000000

router.get('/:ticker', async (req, res) => {
  const { ticker } = req.params
  const { field, fiscalDateRange } = req.query

  const date = parseFiscalDateFromRange(
    fiscalDateRange ?? dayjs().format('YYYY-MM-DD')
  )[0]
  let exchangeRate = 1

  const promises = Promise.all([
    readFile(),
    getFundamentals(ticker, {
      filter: 'General::CurrencyCode'
    }),
    getPrices(ticker, {
      fiscalDateRange: date,
      field: 'adjustedClose'
    }),
    getOutstandingShares(ticker, {
      granularity: 'latest',
      fiscalDateRange: date,
      field: 'shares'
    }),
    getRatios(ticker, {
      granularity: 'latest',
      field: 'interestCoverage',
      fiscalDateRange: date
    })
  ])

  const [
    creditRatingInterestSpreads,
    currencyCode,
    prices,
    outstandingShares,
    interestCoverage
  ] = await promises

  if (currencyCode !== 'USD') {
    // TODO: Fix dates when we have in the database
    exchangeRate = await getExchangeRate(
      'USD',
      convertSubCurrencyToCurrency(currencyCode),
      {
        fiscalDateRange: date,
        field: 'adjustedClose'
      }
    )
  }

  const thresholdMarketCap = thresholdMarketCapUSD * exchangeRate
  const marketCapitalization = prices[0] * outstandingShares[0]
  const isLargeCompany = marketCapitalization >= thresholdMarketCap

  const creditRatingInterestSpread = creditRatingInterestSpreads.find(
    spread => {
      const from = isLargeCompany ? spread.largeFrom : spread.smallFrom
      const to = isLargeCompany ? spread.largeTo : spread.smallTo

      return interestCoverage >= from && interestCoverage <= to
    }
  )

  let value = creditRatingInterestSpread

  if (field) {
    value = creditRatingInterestSpread[field]
  }

  res.send({
    value: getFieldValue(value)
  })
})

export default router
