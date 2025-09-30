import { Router } from 'express';
import { body } from 'express-validator';
import { login, register } from '../controllers/authController.js';

const router = Router();

const credentialsValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

router.post('/register', [...credentialsValidator, body('name').notEmpty()], register);
router.post('/login', credentialsValidator, login);

export default router;
