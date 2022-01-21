import 'dotenv/config'
import * as database from './client/mongoDbClient'

const Collections = {
  SPREADSHEET: 'spreadsheet',
  POWERSHEET_SPREADSHEET: 'powersheet-spreadsheet'
}

const BATCH_SIZE = 100

;(async function () {
  await database.connect()

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
      ...data
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
