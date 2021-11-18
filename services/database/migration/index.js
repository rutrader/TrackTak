import 'dotenv/config'
import mapper from './mapper'
import * as database from './client/mongoDbClient'
import getSymbolFromCurrency from 'currency-symbol-map'
import axios from 'axios'

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
  const mappedData = allData.map(data => {
    const isInPowersheetFormat = !!data.sheetData.data.sheets
    if (isInPowersheetFormat) {
      return data
    }

    return {
      ...data,
      sheetData: mapper(data.sheetData, data.financialData.ticker)
    }
  })

  for (let index = 0; index < mappedData.length; index++) {
    try {
      const mappedDatum = mappedData[index]

      const res = await axios.get(
        `${fundamentalsUrl}/${mappedDatum.financialData.ticker}`,
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
      const cells = mappedDatum.sheetData.data.cells

      Object.keys(cells).forEach(key => {
        const cellData = cells[key]
        const currencyCode = convertSubCurrencyToCurrency(currency)
        const currencySymbol = getSymbolFromCurrency(currencyCode)

        if (cellData.dynamicFormat === 'currency') {
          cells[key].textFormatPattern =
            currencySymbol + cellData.textFormatPattern
        }
      })
    } catch (error) {
      console.warn(
        `Error occurred so skipping currency symbol for stock ${mappedDatum.financialData.ticker}: ${error}`
      )
    }
  }

  console.log(
    `Mapped ${mappedData.length} records from collection: ${Collections.SPREADSHEET}`
  )

  if (!mappedData.length) {
    process.exit(0)
  }

  await database.clearAll(Collections.POWERSHEET_SPREADSHEET)

  await database.bulkInsert(Collections.POWERSHEET_SPREADSHEET, mappedData)

  process.exit(0)
})()
