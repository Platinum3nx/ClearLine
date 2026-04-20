import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { adminMutationRateLimiter, publicRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { TeamsController } from './teams.controller.js';
import { addMemberRequestSchema } from './dtos/add-member.request.js';
import { createTeamRequestSchema } from './dtos/create-team.request.js';
import { listTeamsQuerySchema } from './dtos/list-teams.query.js';
import { updateTeamRequestSchema } from './dtos/update-team.request.js';

export function buildTeamsRouter(controller: TeamsController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.get('/', validate(listTeamsQuerySchema, 'query'), controller.list);
  router.post('/', adminMutationRateLimiter, requireRole('owner'), validate(createTeamRequestSchema), controller.create);
  router.patch('/:teamId', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(updateTeamRequestSchema), controller.update);
  router.post('/:teamId/members', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(addMemberRequestSchema), controller.addMember);

  return router;
}

