#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const autocannon = require('autocannon');

const url = process.argv[2] || 'http://localhost:4000/api/products';

const instance = autocannon({
  url,
  connections: Number(process.env.CONNECTIONS || 200),
  duration: Number(process.env.DURATION || 20),
  amount: Number(process.env.AMOUNT || 0),
  pipelining: 1,
  connectionRate: Number(process.env.RATE || 0)
});

autocannon.track(instance, { renderProgressBar: true });

instance.on('done', (result) => {
  if (result.errors === 0 && result.non2xx === 0 && result.latency.average < 200) {
    console.log('✅ Threshold met: <200ms avg latency, no errors.');
  } else {
    console.log('⚠️ Threshold not met. Inspect metrics above.');
  }
});
