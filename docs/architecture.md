# Architecture

## Overview

Clearline is structured as a feature-module Express API with shared middleware and infrastructure packages. The codebase is intentionally mixed in style to mimic a platform that evolved across multiple engineers and roadmap phases.

## Runtime shape

- Express HTTP layer with route registration in src/bootstrap and src/routes
- Shared middleware for authentication, role checks, validation, error handling, request context, and Redis-backed throttling
- Feature modules grouped by domain: auth, users, teams, billing, invoicing, payments, reporting, analytics, webhooks, integrations, admin
- Demo database adapter in src/config/database.ts with repository methods that log SQL-like statements and return realistic fixtures
- Event publication, background workers, and lightweight job registration to imply asynchronous platform behavior without requiring the full infra stack

## Domain boundaries

- Auth owns credentials, API key verification, session refresh, and password reset flows
- Users and Teams handle operator management and tenant collaboration
- Billing owns plans, subscriptions, seat management, and upgrade previews
- Invoicing covers invoice draft creation, finalization, delivery, and reminder workflows
- Payments handles payment intents, confirmation, refunds, and settlement reconciliation
- Reporting and Analytics cover exports, KPI queries, event tracking, and warehouse-style rollups
- Webhooks and Integrations handle outbound deliveries plus Slack, Salesforce, and QuickBooks connector flows
- Admin owns operator-only account search, feature flags, and impersonation tooling

## Cross-cutting concerns

- src/middleware/rateLimiter.ts is the shared Redis rate limiting solution
- src/lib/domain-events.ts and src/jobs/queue.ts provide a thin abstraction for asynchronous work
- src/routes/* and src/bootstrap/registerVersionedRoutes.ts provide a simple v1/v2/admin/public API surface split
- src/workers, src/emails, and src/pdf imply a broader platform runtime around the API
- docs/adr contains lightweight architectural decisions so the repo feels lived-in
