import http from 'http';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import { connectCache } from './config/cache.js';
import { config } from './config/env.js';
import logger from './utils/logger.js';
import { ensureSeedData } from './utils/seedProducts.js';

async function startServer() {
  await connectDatabase();
  await ensureSeedData();
  await connectCache();

  const server = http.createServer(app);

  server.listen(config.port, () => {
    logger.info(`API listening on port ${config.port}`);
  });

  server.on('error', (error) => {
    logger.error('Server error', error);
  });
}

startServer().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});
