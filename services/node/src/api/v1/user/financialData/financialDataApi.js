import * as database from '../../../../database/mongoDbClient'
import { Collections } from '../../../../database/collections'
import { default as MongoDb } from 'mongodb'

export const getFinancialDataByQuery = async financialDataQuery => {
  return database.findOne(Collections.FINANCIAL_DATA, {
    'general.code': financialDataQuery.code,
    'general.exchange': financialDataQuery.exchange,
    'general.updatedAt': financialDataQuery.updatedAt
  })
}

export const getFinancialData = async id => {
  return database.findOne(Collections.FINANCIAL_DATA, {
    _id: new MongoDb.ObjectId(id)
  })
}

export const createFinancialData = async financialData => {
  return database.insert(Collections.FINANCIAL_DATA, financialData)
}
