# DevOps Basecamp Starter — v2 (Multi-service)

This starter repo is designed for DevOps challenges: multi-service Docker Compose, CI/CD, cloud deploy, and IaC.

## Services
- **nginx**: reverse proxy / load balancer
- **server**: Node.js + Express API
- **worker**: Node.js background worker (simulates async jobs)
- **mongo**: MongoDB database
- **redis**: Redis cache

## Quickstart (Docker Compose)
1. Copy `.env.example` to `.env` and adjust if needed.
2. Run:
   ```bash
   docker-compose up --build
   ```
3. Visit: http://localhost (nginx will proxy to the API)
4. API endpoint: `http://localhost/api/` returns a JSON message.


Happy building 🚀
