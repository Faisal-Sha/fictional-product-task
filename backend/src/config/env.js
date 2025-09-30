import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.API_PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://mongo:27017/eco_bottle',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwt',
  redisUrl: process.env.REDIS_URL || 'redis://redis:6379',
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 100),
  logLevel: process.env.LOG_LEVEL || 'info'
};
