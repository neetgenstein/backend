import mongoose from 'mongoose';

// Singleton for DB connection
let isConnected = false;

export async function connectDB() {
  if (isConnected) return mongoose.connection;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  isConnected = true;
  console.log('Connected to MongoDB');
  return mongoose.connection;
}
