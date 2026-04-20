# ADR 0003: Versioned Route Surfaces

## Status
Accepted

## Decision
Split the API into `public`, `v1`, `v2`, and `admin` route surfaces instead of treating every endpoint as one flat namespace.

## Why
The team wanted room to evolve newer reporting, analytics, and integration flows without rewriting the established `v1` product APIs or admin tooling.
