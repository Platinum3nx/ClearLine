# ClearLine

ClearLine is a fictional enterprise TypeScript and Node.js backend for a B2B invoicing and payments platform. This repository is scaffolded for demos and intentionally includes a few stylistic inconsistencies so it feels like a real codebase that evolved across multiple teams.

## What is in here

- Express and TypeScript application bootstrap
- Feature modules for authentication, users, teams, billing, invoicing, and payments
- Secondary platform modules for reporting, analytics, webhooks, integrations, and admin operations
- Shared Redis-backed rate limiting middleware used across the API surface
- Background workers, email templates, PDF generation, Prisma schema, Docker assets, tests, and architecture docs

## Quick start

1. Copy .env.example to .env.
2. Start dependencies with Docker Compose.
3. Install dependencies with npm.
4. Run npm run dev.

The generated scaffold is meant to look production-like for demos rather than provide a complete working billing system.
