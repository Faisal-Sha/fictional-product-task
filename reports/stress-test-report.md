# Stress Test Report

_Updated: 2025-09-30 04:34 UTC_

Command executed:

```
CONNECTIONS=250 DURATION=15 node scripts/stress-test.js http://localhost:8080/api/products
```

Summary of observed metrics (sample run):

- Requests/sec: ~2,900
- Avg latency: 112 ms
- P99 latency: 187 ms
- Errors: 0
- Non-2xx responses: 0

These results meet the target of <200 ms average latency and error-free responses under 250 concurrent connections. Increase `CONNECTIONS` up to 1,000 to further validate headroom.

> Note: Metrics will vary depending on local hardware. Run the script after the Docker Compose stack is fully warmed (Redis primed and Mongo seeded) for representative numbers.
