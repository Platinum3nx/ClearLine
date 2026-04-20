import { buildIntegrationsRouter } from './integrations.routes.js';
import { IntegrationsController } from './integrations.controller.js';
import { IntegrationsRepository } from './integrations.repository.js';
import { IntegrationsService } from './integrations.service.js';
import { createQuickBooksModule } from './quickbooks/quickbooks.module.js';
import { createSalesforceModule } from './salesforce/salesforce.module.js';
import { createSlackModule } from './slack/slack.module.js';

export function createIntegrationsModule() {
  const repository = new IntegrationsRepository();
  const service = new IntegrationsService(repository);
  const controller = new IntegrationsController(service);
  const slackModule = createSlackModule();
  const salesforceModule = createSalesforceModule();
  const quickBooksModule = createQuickBooksModule();

  return {
    router: buildIntegrationsRouter(controller, {
      slack: slackModule.router,
      salesforce: salesforceModule.router,
      quickbooks: quickBooksModule.router,
    }),
  };
}
