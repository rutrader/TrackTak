import express from 'express'
import { getFundamentals, getRatios } from '../stockApi'
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

  const { general, outstandingShares } = await getFundamentals(ticker, {
    filter: 'General::CurrencyCode,outstandingShares'
  })
  const date = parseFiscalDateFromRange(
    fiscalDateRange ?? dayjs().format('YYYY-MM-DD')
  )[0]

  let exchangeRate = 1

  if (general.currencyCode !== 'USD') {
    // TODO: Fix dates when we have in the database
    exchangeRate = await getExchangeRate(
      'USD',
      convertSubCurrencyToCurrency(general.currencyCode),
      {
        fiscalDateRange: date,
        field: 'adjustedClose'
      }
    )
  }

  const thresholdMarketCap = thresholdMarketCapUSD * exchangeRate

  // TODO: Change marketCap to historical one
  const isLargeCompany = highlights.marketCapitalization >= thresholdMarketCap

  const creditRatingInterestSpreads = await readFile()

  const interestCoverage = (
    await getRatios(ticker, {
      granularity: 'latest',
      field: 'interestCoverage',
      fiscalDateRange: date
    })
  )[0]

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
