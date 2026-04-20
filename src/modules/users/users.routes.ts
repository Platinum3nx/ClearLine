import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { requireRole } from '../../middleware/requireRole.js';
import { adminMutationRateLimiter, publicRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { UsersController } from './users.controller.js';
import { createUserRequestSchema } from './dtos/create-user.request.js';
import { inviteUserRequestSchema } from './dtos/invite-user.request.js';
import { listUsersQuerySchema } from './dtos/list-users.query.js';
import { updateUserRequestSchema } from './dtos/update-user.request.js';

export function buildUsersRouter(controller: UsersController) {
  const router = Router();

  router.use(requireAuth, publicRateLimiter);
  router.get('/', validate(listUsersQuerySchema, 'query'), controller.list);
  router.post('/', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(createUserRequestSchema), controller.create);
  router.patch('/:userId', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(updateUserRequestSchema), controller.update);
  router.post('/invite', adminMutationRateLimiter, requireRole('owner', 'admin'), validate(inviteUserRequestSchema), controller.invite);

  return router;
}

