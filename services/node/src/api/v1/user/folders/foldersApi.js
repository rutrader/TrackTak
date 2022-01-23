import { Collections } from '../../../../database/collections'
import * as database from '../../../../database/mongoDbClient'
import { default as MongoDb } from 'mongodb'

export const getFolders = async userId => {
  return database.find(Collections.FOLDER, {
    userId
  })
}

export const getFolder = async id => {
  return database.find(Collections.FOLDER, [
    {
      _id: new MongoDb.ObjectId(id)
    }
  ])
}

export const createFolder = async (name, userId) => {
  return database.insert(Collections.FOLDER, {
    userId,
    name
  })
}

export const updateFolder = async (id, name) => {
  return database.updateOne(
    Collections.FOLDER,
    {
      _id: new MongoDb.ObjectId(id)
    },
    {
      $set: { name }
    }
  )
}

export const deleteFolder = async id => {
  return database.deleteOne(Collections.FOLDER, {
    _id: new MongoDb.ObjectId(id)
  })
}
