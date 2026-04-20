import { buildAnalyticsRouter } from './analytics.routes.js';
import { AnalyticsController } from './analytics.controller.js';
import { AnalyticsRepository } from './analytics.repository.js';
import { AnalyticsService } from './analytics.service.js';
import { WarehouseClient } from './clients/warehouse.client.js';

export function createAnalyticsModule() {
  const repository = new AnalyticsRepository();
  const warehouseClient = new WarehouseClient();
  const service = new AnalyticsService(repository, warehouseClient);
  const controller = new AnalyticsController(service);

  return {
    router: buildAnalyticsRouter(controller),
  };
}
