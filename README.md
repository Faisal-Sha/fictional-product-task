# EcoFlow Bottle Landing Experience

A full-stack, production-ready simulation of a high-traffic e-commerce landing page for the fictional **EcoFlow** eco-friendly water bottle. The project includes an SSR React frontend (Next.js), a secure Node.js API, caching, monitoring, load-balancing, and automation for traffic simulation.

## Features

### Frontend (Next.js)
- Responsive hero section with parallax scrolling and Framer Motion animations.
- Dynamic lead capture form with real-time validation and API submission.
- A/B-testable headline variants toggled with `?variant=a|b` query parameter.
- Server-side rendering via `getServerSideProps` with live product data from the backend and fallback handling.
- Product listing grid pulling CDN-hosted imagery (Cloudinary) and showcasing features.

### Backend (Express)
- JWT-based authentication with registration and login endpoints.
- MongoDB data models for users, products, and captured leads.
- CRUD REST API for products guarded by authentication and validation.
- Redis caching layer for high-throughput product listing requests.
- Rate limiting, structured logging, and congestion-aware error messaging.
- Prometheus metrics endpoint for monitoring.

### Operations & Tooling
- Docker Compose stack with MongoDB, Redis, API, frontend, Prometheus, and an NGINX reverse proxy for load balancing.
- Instructions for scaling API containers horizontally via Compose.
- Prometheus scraping of API metrics; ready for Grafana integration.
- Traffic simulation script using `autocannon` supporting up to 1,000 concurrent requests.
- Placeholder guidance for CDN usage (Cloudinary) and production rollout to 100k+ users.

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (optional for local development without containers)

### Environment Variables
Copy the sample environment files before running locally:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Adjust the values as needed (e.g., change `JWT_SECRET`).

### Local Development (without Docker)

Run the backend:

```bash
cd backend
npm install
npm run dev
```

> ⚠️ If the default npm registry is blocked, configure an alternative mirror before installing dependencies: `npm config set registry https://registry.npmmirror.com`.

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Navigate to `http://localhost:3000` and append `?variant=b` to test the alternate headline.

### Dockerized Stack

Build and start the entire stack (frontend available at `http://localhost:8080`):

```bash
docker-compose up --build
```

Scale the API horizontally behind NGINX:

```bash
docker-compose up --build --scale api=3
```

This leverages Docker DNS round-robin to distribute traffic across replicas.

### Monitoring
- Prometheus dashboard: `http://localhost:9090`
- API metrics endpoint: `http://localhost:4000/metrics`

### Stress Testing

The `scripts/stress-test.js` helper wraps [`autocannon`](https://github.com/mcollina/autocannon). Install dependencies and run:

```bash
cd scripts
npm init -y
npm install autocannon
node stress-test.js http://localhost:8080/api/products
```

Configure concurrency with environment variables:

```bash
CONNECTIONS=1000 DURATION=30 node stress-test.js http://localhost:8080/api/products
```

Look for the `✅ Threshold met` message indicating sub-200ms average latency and zero errors.

### Deployment Notes
- **Frontend**: Deploy to Vercel/Netlify. Update `NEXT_PUBLIC_API_URL` to point to the deployed API (e.g., `https://api.example.com`).
- **Backend**: Deploy on services such as Render, Railway, Fly.io, or Heroku. Provision MongoDB Atlas and a managed Redis instance.
- **CDN**: Replace the sample Cloudinary URLs with your account for optimized asset delivery.

### Scaling to 100k+ Users
- Use managed MongoDB/Redis clusters with auto-scaling.
- Place API behind a load balancer (e.g., AWS ALB) with autoscaling groups or Kubernetes for orchestration.
- Adopt CDN edge caching for product assets and SSR responses using stale-while-revalidate strategies.
- Implement distributed tracing (OpenTelemetry) and log aggregation (ELK stack) to monitor request patterns.
- Introduce background workers (BullMQ) for heavy tasks like analytics aggregation.
- Utilize feature flag platforms for A/B testing at scale and integrate with experimentation analytics.

## Project Structure

```
backend/    # Express API source
frontend/   # Next.js landing experience
config/     # NGINX and Prometheus configuration
scripts/    # Automation and load testing helpers
docker-compose.yml
```

## Testing & Quality
- API endpoints validated with `express-validator` and rate limited.
- Prometheus metrics available for integration with alerting.
- Stress testing script ensures low latency at high concurrency.

## License
MIT
