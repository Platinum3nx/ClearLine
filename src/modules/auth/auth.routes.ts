import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth.js';
import { authBurstRateLimiter } from '../../middleware/rateLimiter.js';
import { validate } from '../../middleware/validate.js';
import type { AuthController } from './auth.controller.js';
import { loginRequestSchema } from './dtos/login.request.js';
import { refreshTokenRequestSchema } from './dtos/refresh-token.request.js';
import { registerUserRequestSchema } from './dtos/register-user.request.js';
import { requestPasswordResetRequestSchema } from './dtos/request-password-reset.request.js';
import { resetPasswordRequestSchema } from './dtos/reset-password.request.js';

export function buildAuthRouter(controller: AuthController) {
  const router = Router();

  router.post('/login', authBurstRateLimiter, validate(loginRequestSchema), controller.login);
  router.post('/refresh', authBurstRateLimiter, validate(refreshTokenRequestSchema), controller.refresh);
  router.post('/register', authBurstRateLimiter, validate(registerUserRequestSchema), controller.register);
  router.post('/password-reset/request', authBurstRateLimiter, validate(requestPasswordResetRequestSchema), controller.requestPasswordReset);
  router.post('/password-reset/confirm', authBurstRateLimiter, validate(resetPasswordRequestSchema), controller.resetPassword);
  router.get('/me', requireAuth, controller.me);

  return router;
}

