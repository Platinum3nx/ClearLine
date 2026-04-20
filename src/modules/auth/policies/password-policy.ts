import { ForbiddenError } from '../../../lib/errors.js';

export function assertStrongPassword(password: string) {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);

  if (password.length < 12 || !hasUppercase || !hasLowercase || !hasDigit) {
    throw new ForbiddenError('Password does not meet platform policy');
  }
}

