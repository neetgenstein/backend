import { StatusCodes } from 'http-status-codes';
import { productService } from '../services/productService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(StatusCodes.CREATED).json({ success: true, data: product });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

export const listProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'desc' } = req.query;
  const data = await productService.listProducts({
    page: Number(page),
    limit: Number(limit),
    search: String(search),
    sortBy: String(sortBy),
    order: String(order),
  });
  res.json({ success: true, ...data });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const updated = await productService.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: updated });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await productService.deleteProduct(req.params.id);
  if (!deleted) return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Deleted successfully' });
});
