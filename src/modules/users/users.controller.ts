import { asyncHandler } from '../../lib/asyncHandler.js';
import { accepted, created, ok } from '../../lib/http.js';
import type { UsersService } from './users.service.js';

export class UsersController {
  constructor(private readonly service: UsersService) {}

  list = asyncHandler(async (req, res) => {
    ok(res, await this.service.listUsers(req.query));
  });

  create = asyncHandler(async (req, res) => {
    created(res, await this.service.createUser(req.body, req.user!));
  });

  update = asyncHandler(async (req, res) => {
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
    ok(res, await this.service.updateUser(userId, req.body, req.user!));
  });

  invite = asyncHandler(async (req, res) => {
    accepted(res, await this.service.inviteUser(req.body, req.user!));
  });
}
