import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js';
import { validate } from '../middleware/validateRequest.js';

const router = Router();

// Validation rules
const idParam = param('id', 'Invalid product id').isMongoId();

const productBodyCreate = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be >= 0'),
  body('category').optional().isString().isLength({ max: 60 }),
  body('imageUrl').optional().isURL().withMessage('imageUrl must be a valid URL'),
];

const productBodyUpdate = [
  body('name').optional().trim().notEmpty().isLength({ max: 120 }),
  body('price').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
  body('category').optional().isString().isLength({ max: 60 }),
  body('imageUrl').optional().isURL(),
  body('isActive').optional().isBoolean(),
];

const listQuery = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('search').optional().isString(),
  query('sortBy').optional().isIn(['createdAt', 'price', 'name']),
  query('order').optional().isIn(['asc', 'desc']),
];

// Routes
router.get('/', listQuery, validate, listProducts);
router.get('/:id', idParam, validate, getProduct);
router.post('/', productBodyCreate, validate, createProduct);
router.put('/:id', idParam, productBodyUpdate, validate, updateProduct);
router.delete('/:id', idParam, validate, deleteProduct);

export default router;
