import mapper from './mapper.js'
import * as database from './client/mongoDbClient.js'
import { Collections } from './client/collections.js'

;(async function () {
  await database.connect()

  const allData = await database.find(Collections.SPREADSHEET)
  const mappedData = allData.map(data => {
    const isInPowersheetFormat = !!data.sheetData.data.sheets
    if (isInPowersheetFormat) {
      console.log('Record already in Powersheet format')
      return data
    }

    return {
      ...data,
      sheetData: mapper(data.sheetData, data.financialData.ticker)
    }
  })
  console.log(
    `Mapped ${mappedData.length} records from collection: ${Collections.SPREADSHEET}`
  )

  if (!mappedData.length) {
    process.exit(0)
  }

  await database.clearAll(Collections.POWERSHEET_SPREADSHEET)
  console.log(`Cleared collection: ${Collections.POWERSHEET_SPREADSHEET}`)
  await database.bulkInsert(Collections.POWERSHEET_SPREADSHEET, mappedData)

  const result = await database.find(Collections.POWERSHEET_SPREADSHEET)

  console.log(
    `Inserted ${result.length} records into collection: ${Collections.POWERSHEET_SPREADSHEET}`
  )

  process.exit(0)
})()
