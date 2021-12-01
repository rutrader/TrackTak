import 'dotenv/config'
import * as database from './client/mongoDbClient'
import getSymbolFromCurrency from 'currency-symbol-map'
import axios from 'axios'
import fs from 'fs'

const baseUrl = 'https://eodhistoricaldata.com/api'
const fundamentalsUrl = `${baseUrl}/fundamentals`

const convertSubCurrencyToCurrency = currencyCode => {
  if (currencyCode === 'ILA') {
    return 'ILS'
  }
  if (currencyCode === 'GBX') {
    return 'GBP'
  }
  return currencyCode
}

const Collections = {
  SPREADSHEET: 'spreadsheet',
  POWERSHEET_SPREADSHEET: 'powersheet-spreadsheet'
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

;(async function () {
  await database.connect()

  const allData = await database.find(Collections.SPREADSHEET)
  const currencySymbolsMap = {}

  for (let index = 0; index < allData.length; index++) {
    try {
      const data = allData[index]
      const res = await axios.get(
        `${fundamentalsUrl}/${data.financialData.ticker}`,
        {
          params: {
            api_token: process.env.EOD_HISTORICAL_DATA_API_KEY,
            filter: 'General::CurrencyCode'
          }
        }
      )

      const requestsRemaining = parseInt(
        res.headers['x-ratelimit-remaining'],
        10
      )

      if (requestsRemaining <= 10) {
        await sleep(70000)
      }

      const currency = res.data
      const currencyCode = convertSubCurrencyToCurrency(currency)
      const currencySymbol = getSymbolFromCurrency(currencyCode)

      currencySymbolsMap[data.financialData.ticker] = currencySymbol

      console.log(data.financialData.ticker)
    } catch (error) {
      console.warn(error)
      console.log(`error occurred, skipping: ${data.financialData.ticker}`)
    }
  }

  fs.writeFileSync('currencies.json', JSON.stringify(currencySymbolsMap))

  process.exit(0)
})()
