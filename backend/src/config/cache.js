import { createClient } from 'redis';
import logger from '../utils/logger.js';
import { config } from './env.js';

const client = createClient({ url: config.redisUrl });

client.on('error', (err) => logger.error('Redis Client Error', err));
client.on('connect', () => logger.info('Connected to Redis cache'));

export async function connectCache() {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}

export default client;
