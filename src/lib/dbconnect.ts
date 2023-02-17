import mongoose from 'mongoose';

require('../model/Subscription');
require('../model/TemporaryKey');
require('../model/Transaction');
require('../model/User');

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

const globalWithMongoose = global as typeof globalThis & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
