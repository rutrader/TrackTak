import { Collections } from '../../../../database/collections'
import * as database from '../../../../database/mongoDbClient'
import { default as MongoDb } from 'mongodb'

export const updateSpreadsheetFinancialData = async (id, financialDataId) => {
  return database.updateOne(
    Collections.POWERSHEET_SPREADSHEET,
    {
      _id: new MongoDb.ObjectId(id)
    },
    {
      $set: { 'financialData.id': financialDataId }
    }
  )
}

export const createSpreadsheet = async (sheetData, userId, financialData) => {
  const document = {
    financialData,
    userId,
    sheetData,
    lastModifiedTimestamp: new Date(),
    createdTimestamp: new Date()
  }

  return database.insert(Collections.POWERSHEET_SPREADSHEET, document)
}

export const updateSpreadsheet = async (
  sheetData,
  userId,
  financialData,
  spreadsheetId,
  createdTimestamp
) => {
  const document = {
    financialData,
    userId,
    sheetData,
    lastModifiedTimestamp: new Date(),
    createdTimestamp
  }
  const query = {
    'sheetData.name': sheetData.name,
    userId
  }

  return database.replace(
    Collections.POWERSHEET_SPREADSHEET,
    query,
    document,
    spreadsheetId
  )
}

export const getSpreadsheetsMetadata = async userId => {
  return database.find(
    Collections.POWERSHEET_SPREADSHEET,
    {
      userId
    },
    {
      projection: {
        'sheetData.data': 0
      }
    }
  )
}

export const getSpreadsheet = async id => {
  return database.findOne(Collections.POWERSHEET_SPREADSHEET, {
    _id: new MongoDb.ObjectId(id)
  })
}

export const deleteSpreadsheet = async id => {
  return database.deleteOne(Collections.POWERSHEET_SPREADSHEET, {
    _id: new MongoDb.ObjectId(id)
  })
}
