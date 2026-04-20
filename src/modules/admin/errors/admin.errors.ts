import { AppError } from '../../../lib/errors.js';

export class AdminImpersonationError extends AppError {
  constructor(targetUserId: string) {
    super(409, 'admin_impersonation_failed', 'Admin impersonation failed for ' + targetUserId);
  }
}
