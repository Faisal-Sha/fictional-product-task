import { validationResult } from 'express-validator';
import Lead from '../models/Lead.js';

export async function createLead(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const lead = await Lead.create(req.body);
    return res.status(201).json({ message: 'Lead captured', lead });
  } catch (error) {
    return next(error);
  }
}
