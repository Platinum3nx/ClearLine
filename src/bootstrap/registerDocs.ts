import type { Express } from 'express';

export function registerDocs(app: Express) {
  app.get('/docs/openapi.json', (_req, res) => {
    res.json({
      openapi: '3.1.0',
      info: {
        title: 'Clearline API',
        version: '0.1.0',
      },
    });
  });
}

