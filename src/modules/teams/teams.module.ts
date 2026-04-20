import { buildTeamsRouter } from './teams.routes.js';
import { TeamsController } from './teams.controller.js';
import { TeamsRepository } from './teams.repository.js';
import { TeamsService } from './teams.service.js';

export function createTeamsModule() {
  const repository = new TeamsRepository();
  const service = new TeamsService(repository);
  const controller = new TeamsController(service);

  return {
    router: buildTeamsRouter(controller),
  };
}

