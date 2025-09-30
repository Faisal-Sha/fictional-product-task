import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { config } from './env.js';

export async function connectDatabase() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongoUri, { autoIndex: true });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Mongo connection error', error);
    process.exit(1);
  }
}
