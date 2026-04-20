# Directory Structure

.
├── docs
├── openapi
├── prisma
├── src
│   ├── bootstrap
│   ├── config
│   ├── jobs
│   ├── lib
│   ├── middleware
│   ├── pdf
│   ├── modules
│   │   ├── admin
│   │   ├── analytics
│   │   ├── auth
│   │   ├── billing
│   │   ├── integrations
│   │   ├── invoicing
│   │   ├── payments
│   │   ├── reporting
│   │   ├── teams
│   │   └── users
│   ├── emails
│   ├── routes
│   └── types
│   └── workers
└── tests
    ├── helpers
    └── integration

The layout leans feature-first inside src/modules, while bootstrap, config, middleware, lib, workers, emails, and pdf hold shared platform code. That split lets a larger team move independently without every change becoming a cross-repo coordination problem.
