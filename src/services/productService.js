// Service Layer: business rules and orchestration
import { productRepository } from '../repositories/productRepository.js';

export const productService = {
  async createProduct(data) {
    // Example business rule: price must be > 0 and stock can't be negative (also validated at API)
    return productRepository.create(data);
  },

  async getProductById(id) {
    return productRepository.findById(id);
  },

  async listProducts(query) {
    return productRepository.findAll(query);
  },

  async updateProduct(id, data) {
    return productRepository.updateById(id, data);
  },

  async deleteProduct(id) {
    return productRepository.deleteById(id);
  },
};
