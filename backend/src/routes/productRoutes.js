import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js';

const router = Router();

const productValidators = [
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('inventory').optional().isInt({ min: 0 }),
  body('imageUrl').isURL()
];

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', authenticate, productValidators, createProduct);
router.put('/:id', authenticate, productValidators, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
