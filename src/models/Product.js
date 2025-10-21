import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, default: 'General' },
    stock: { type: Number, default: 0, min: 0 },
    imageUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
