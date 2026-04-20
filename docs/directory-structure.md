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
│   ├── modules
│   │   ├── auth
│   │   ├── billing
│   │   ├── invoicing
│   │   ├── payments
│   │   ├── teams
│   │   └── users
│   ├── routes
│   └── types
└── tests
    ├── helpers
    └── integration

The layout leans feature-first inside src/modules, while bootstrap, config, middleware, and lib hold shared platform code. That split lets a larger team move independently without every change becoming a cross-repo coordination problem.

