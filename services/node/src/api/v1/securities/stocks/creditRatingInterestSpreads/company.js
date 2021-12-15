import express from 'express'
import { getFundamentals, getRatios } from '../stockApi'
import readFile from '../../../market/creditRatingInterestSpreads/readFile'
import { getExchangeRate } from '../../fx/fxApi'
import dayjs from 'dayjs'
import convertSubCurrencyToCurrency from '../../fx/convertSubCurrencyToCurrency'
import { getFieldValue } from '../../helpers'

const router = express.Router()

const thresholdMarketCapUSD = 5000000000

router.get('/:ticker', async (req, res) => {
  const { ticker } = req.params
  const { field, from, to } = req.query

  const { general, highlights } = await getFundamentals(ticker, {
    filter: 'General::CurrencyCode,Highlights::MarketCapitalization'
  })
  const defaultDate = dayjs().format('YYYY-MM-DD')

  let exchangeRate = 1

  if (general.currencyCode !== 'USD') {
    const exchangeRates = await getExchangeRate(
      'USD',
      convertSubCurrencyToCurrency(general.currencyCode),
      {
        from: from ?? defaultDate,
        to: to ?? defaultDate
      }
    )

    exchangeRate = exchangeRates[0].adjustedClose
  }

  const thresholdMarketCap = thresholdMarketCapUSD * exchangeRate

  // TODO: Change marketCap to historical one
  const isLargeCompany = highlights.marketCapitalization >= thresholdMarketCap

  const creditRatingInterestSpreads = await readFile()

  const ratios = await getRatios(ticker, req.query)

  const creditRatingInterestSpread = creditRatingInterestSpreads.find(
    spread => {
      const from = isLargeCompany ? spread.largeFrom : spread.smallFrom
      const to = isLargeCompany ? spread.largeTo : spread.smallTo

      return ratios.interestCoverage >= from && ratios.interestCoverage <= to
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
