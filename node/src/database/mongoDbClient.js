import { default as MongoDb } from "mongodb";

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const URI = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?retryWrites=true&w=1;authSource=admin`;

const client = new MongoDb.MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const connect = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch (err) {
    throw err;
  }
};

export const createCollection = (collection) => {
  const database = client.db(DATABASE_NAME);
  database.createCollection(collection, function (err, res) {
    if (err) throw err;
    console.log(`Collection ${collection} created!`, res);
  });
};

export const insert = (collection, document) => {
  const database = client.db(DATABASE_NAME);
  database.collection(collection).insertOne(document, function (err, res) {
    if (err) throw err;
    console.log(`1 document inserted into collection ${collection}`);
  });
};

export const find = async (collection, query = {}) => {
  const database = client.db(DATABASE_NAME);
  database.collection(collection).findOne(query, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
};
