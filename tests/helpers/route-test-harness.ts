export function countRegisteredRoutes(router: { stack?: Array<unknown> }) {
  return router.stack?.length ?? 0;
}

