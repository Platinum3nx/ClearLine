import { asyncHandler } from '../../lib/asyncHandler.js';
import { created, ok } from '../../lib/http.js';
import type { TeamsService } from './teams.service.js';

export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  list = asyncHandler(async (req, res) => {
    ok(res, await this.service.listTeams(req.query));
  });

  create = asyncHandler(async (req, res) => {
    created(res, await this.service.createTeam(req.body, req.user!));
  });

  update = asyncHandler(async (req, res) => {
    const teamId = Array.isArray(req.params.teamId) ? req.params.teamId[0] : req.params.teamId;
    ok(res, await this.service.updateTeam(teamId, req.body, req.user!));
  });

  addMember = asyncHandler(async (req, res) => {
    const teamId = Array.isArray(req.params.teamId) ? req.params.teamId[0] : req.params.teamId;
    created(res, await this.service.addMember(teamId, req.body, req.user!));
  });
}
