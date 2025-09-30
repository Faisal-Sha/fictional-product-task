import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { config } from '../config/env.js';

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '12h' });
}

export async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create(req.body);
    const token = createToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const valid = await user.comparePassword(req.body.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = createToken(user);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
}
