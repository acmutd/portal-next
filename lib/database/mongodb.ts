import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(uri!, {
  minPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
});
const clientPromise = client.connect();

export default clientPromise;
