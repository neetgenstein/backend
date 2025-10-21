// Repository Pattern: abstracts data access for Products
import { Product } from '../models/Product.js';

export const productRepository = {
  async create(data) {
    const doc = await Product.create(data);
    return doc.toObject();
  },

  async findById(id) {
    return Product.findById(id).lean();
  },

  async findAll({ page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'desc' } = {}) {
    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const sort = { [sortBy]: order === 'asc' ? 1 : -1 };
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async updateById(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  },

  async deleteById(id) {
    return Product.findByIdAndDelete(id).lean();
  },
};
