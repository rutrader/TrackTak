import 'dotenv/config'
import mapper from './mapper'
import * as database from './client/mongoDbClient'
import fs from 'fs'

const Collections = {
  SPREADSHEET: 'spreadsheet',
  POWERSHEET_SPREADSHEET: 'powersheet-spreadsheet'
}

const BATCH_SIZE = 100

;(async function () {
  await database.connect()

  const currencies = JSON.parse(fs.readFileSync(`currencies.json`))

  const allDataItr = await database.find(Collections.SPREADSHEET)

  let batch = []
  let insertCount = 0
  while (await allDataItr.hasNext()) {
    const data = await allDataItr.next()
    const isInPowersheetFormat = !!data.sheetData.data.sheets
    if (isInPowersheetFormat) {
      continue
    }
    const powersheet = {
      ...data,
      sheetData: mapper(data.sheetData, data.financialData.ticker)
    }

    try {
      const cells = powersheet.sheetData.data.cells
      const ticker = powersheet.financialData.ticker

      Object.keys(cells).forEach(key => {
        const cellData = cells[key]
        const currencySymbol = currencies[ticker]

        if (cellData.dynamicFormat === 'currency') {
          cells[key].textFormatPattern =
            currencySymbol + cellData.textFormatPattern
        }
      })
    } catch (error) {
      console.warn(error)
      console.log(`error occurred, skipping stock`)
    }

    batch.push(powersheet)
    if (batch.length === BATCH_SIZE) {
      await database.bulkInsert(Collections.POWERSHEET_SPREADSHEET, batch)
      batch = []
      insertCount += BATCH_SIZE
      console.log(`Inserted ${insertCount} / ${await allDataItr.count()}`)
    }
  }

  if (batch.length > 0) {
    await database.bulkInsert(Collections.POWERSHEET_SPREADSHEET, batch)
  }

  process.exit(0)
})()
