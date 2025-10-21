import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Product } from '../models/Product.js';

dotenv.config();

async function seed() {
  try {
    await connectDB();

    const count = await Product.countDocuments();
    if (count > 0) {
      console.log(`Products already exist (${count}). Skipping insert.`);
      await mongoose.connection.close();
      return;
    }

    const now = new Date();
    const docs = [
      {
        name: 'iPhone 15',
        description: 'Latest Apple iPhone with A16 chip',
        price: 999,
        stock: 10,
        category: 'Phones',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Galaxy S24',
        description: 'Samsung flagship with amazing display',
        price: 899,
        stock: 12,
        category: 'Phones',
        imageUrl: 'https://images.unsplash.com/photo-1510552776732-01acc9a4c3d7',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise cancelling headphones',
        price: 349,
        stock: 25,
        category: 'Audio',
        imageUrl: 'https://images.unsplash.com/photo-1518444028785-8f9f97c9bc9f',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'MacBook Air M2',
        description: 'Lightweight laptop with Apple M2',
        price: 1199,
        stock: 7,
        category: 'Laptops',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ];

    await Product.insertMany(docs);
    console.log(`Inserted ${docs.length} products.`);

    await mongoose.connection.close();
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  }
}

seed();
