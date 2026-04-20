import { asyncHandler } from '../../lib/asyncHandler.js';
import { created, ok } from '../../lib/http.js';
import type { AuthService } from './auth.service.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = asyncHandler(async (req, res) => {
    const session = await this.authService.login(req.body);
    ok(res, session);
  });

  refresh = asyncHandler(async (req, res) => {
    const session = await this.authService.refresh(req.body.refreshToken);
    ok(res, session);
  });

  register = asyncHandler(async (req, res) => {
    const account = await this.authService.register(req.body);
    created(res, account);
  });

  requestPasswordReset = asyncHandler(async (req, res) => {
    const result = await this.authService.requestPasswordReset(req.body.email);
    ok(res, result);
  });

  resetPassword = asyncHandler(async (req, res) => {
    const result = await this.authService.resetPassword(req.body);
    ok(res, result);
  });

  me = asyncHandler(async (req, res) => {
    const profile = await this.authService.getCurrentProfile(req.user!);
    ok(res, profile);
  });
}

