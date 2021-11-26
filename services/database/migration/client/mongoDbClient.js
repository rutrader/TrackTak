import { default as MongoDb } from 'mongodb'

const DB_CONFIG = {
  host: 'localhost',
  name: 'admin',
  user: 'root',
  password: 'mongoRootPassword'
}
const URI = `mongodb://${DB_CONFIG.user}:${DB_CONFIG.password}@${DB_CONFIG.host}/${DB_CONFIG.name}?retryWrites=true&authSource=${DB_CONFIG.name}`

const client = new MongoDb.MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const connect = async () => {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('Connected successfully to MongoDB server')
  } catch (err) {
    throw err
  }
}

export const find = async (collection, query) => {
  const database = client.db(DB_CONFIG.name)
  return database.collection(collection).find(query)
}

export const clearAll = async collection => {
  const database = client.db(DB_CONFIG.name)
  return database.collection(collection).deleteMany({})
}

export const bulkInsert = async (collection, data) => {
  const database = client.db(DB_CONFIG.name)
  var bulk = await database.collection(collection).initializeUnorderedBulkOp()
  data.forEach(item => {
    bulk.insert(item)
  })
  await bulk.execute()
}
