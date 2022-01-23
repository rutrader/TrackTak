import { Collections } from '../../../../database/collections'
import * as database from '../../../../database/mongoDbClient'
import { default as MongoDb } from 'mongodb'

export const createSpreadsheet = async (sheetData, userId) => {
  const document = {
    userId,
    sheetData,
    lastModifiedTimestamp: new Date(),
    createdTimestamp: new Date()
  }

  return database.insert(Collections.POWERSHEET_SPREADSHEET, document)
}

export const updateSpreadsheet = async spreadsheet => {
  const document = {
    ...spreadsheet,
    lastModifiedTimestamp: new Date()
  }
  const query = {
    _id: spreadsheet._id
  }

  return database.replace(
    Collections.POWERSHEET_SPREADSHEET,
    query,
    document,
    spreadsheet._id
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

export const getSpreadsheetsInFolder = async folderId => {
  return database.find(
    Collections.POWERSHEET_SPREADSHEET,
    {
      folderId
    },
    {
      projection: {
        'sheetData.data': 0
      }
    }
  )
}

export const updateSpreadsheetFolder = async (id, folderId) => {
  return database.updateOne(
    Collections.POWERSHEET_SPREADSHEET,
    {
      _id: new MongoDb.ObjectId(id)
    },
    {
      $set: { folderId }
    }
  )
}
