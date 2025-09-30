import { Router } from 'express';
import { body } from 'express-validator';
import { createLead } from '../controllers/leadController.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('message').optional().isLength({ max: 500 })
  ],
  createLead
);

export default router;
