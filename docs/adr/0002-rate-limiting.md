# ADR 0002: Redis Rate Limiting

## Status
Accepted

## Decision
Use Redis-backed request counters for auth bursts, invoice mutation traffic, and payment operations.

## Consequences
- Limits stay consistent across stateless API pods
- If Redis is unavailable, the middleware degrades open and records a warning
- Several route files import the shared limiter presets rather than inventing module-local throttle logic

