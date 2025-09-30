import { validationResult } from 'express-validator';
import Product from '../models/Product.js';
import cacheClient, { connectCache } from '../config/cache.js';

const PRODUCT_LIST_CACHE_KEY = 'products:all';

async function invalidateCache() {
  if (!cacheClient.isOpen) {
    await connectCache();
  }
  await cacheClient.del(PRODUCT_LIST_CACHE_KEY);
}

export async function listProducts(req, res, next) {
  try {
    await connectCache();
    const cached = await cacheClient.get(PRODUCT_LIST_CACHE_KEY);
    if (cached) {
      return res.json({ source: 'cache', data: JSON.parse(cached) });
    }
    const products = await Product.find().lean();
    await cacheClient.set(PRODUCT_LIST_CACHE_KEY, JSON.stringify(products), { EX: 60 });
    return res.json({ source: 'db', data: products });
  } catch (error) {
    return next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    return next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const product = await Product.create(req.body);
    await invalidateCache();
    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await invalidateCache();
    return res.json(product);
  } catch (error) {
    return next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await invalidateCache();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
