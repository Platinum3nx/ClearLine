import { buildSalesforceRouter } from './salesforce.routes.js';
import { SalesforceController } from './salesforce.controller.js';
import { SalesforceService } from './salesforce.service.js';
import { SalesforceClient } from './salesforce.client.js';

export function createSalesforceModule() {
  const client = new SalesforceClient();
  const service = new SalesforceService(client);
  const controller = new SalesforceController(service);

  return {
    router: buildSalesforceRouter(controller),
  };
}
