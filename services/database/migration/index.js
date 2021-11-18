import 'dotenv/config'
import mapper from './mapper'
import * as database from './client/mongoDbClient'
import fs from 'fs'

const Collections = {
  SPREADSHEET: 'spreadsheet',
  POWERSHEET_SPREADSHEET: 'powersheet-spreadsheet'
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

  const currencies = JSON.parse(fs.readFileSync(`currencies.json`))

  for (let index = 0; index < mappedData.length; index++) {
    const mappedDatum = mappedData[index]
    const cells = mappedDatum.sheetData.data.cells
    const ticker = mappedDatum.financialData.ticker

    Object.keys(cells).forEach(key => {
      const cellData = cells[key]
      const currencySymbol = currencies[ticker]

      if (cellData.dynamicFormat === 'currency') {
        cells[key].textFormatPattern =
          currencySymbol + cellData.textFormatPattern
      }
    })
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
