import logger from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error('Unhandled error', err);
  const status = err.status || 500;
  const message = status === 429 ? 'Too many requests, please slow down.' : err.message || 'Internal server error';
  res.status(status).json({ message });
}
