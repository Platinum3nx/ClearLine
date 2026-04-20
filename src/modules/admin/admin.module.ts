import { buildAdminModuleRouter } from './admin.routes.js';
import { AdminController } from './admin.controller.js';
import { AdminRepository } from './admin.repository.js';
import { AdminService } from './admin.service.js';

export function createAdminModule() {
  const repository = new AdminRepository();
  const service = new AdminService(repository);
  const controller = new AdminController(service);

  return {
    router: buildAdminModuleRouter(controller),
  };
}
