import { buildAuthRouter } from './auth.routes.js';
import { AuthController } from './auth.controller.js';
import { AuthRepository } from './auth.repository.js';
import { AuthService } from './auth.service.js';

export function createAuthModule() {
  const repository = new AuthRepository();
  const service = new AuthService(repository);
  const controller = new AuthController(service);

  return {
    router: buildAuthRouter(controller),
  };
}

