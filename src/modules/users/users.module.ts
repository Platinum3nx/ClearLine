import { buildUsersRouter } from './users.routes.js';
import { UsersController } from './users.controller.js';
import { UsersRepository } from './users.repository.js';
import { UsersService } from './users.service.js';

export function createUsersModule() {
  const repository = new UsersRepository();
  const service = new UsersService(repository);
  const controller = new UsersController(service);

  return {
    router: buildUsersRouter(controller),
  };
}

