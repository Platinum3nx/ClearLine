import { AppError } from '../../../lib/errors.js';

export class DuplicateUserError extends AppError {
  constructor(email: string) {
    super(409, 'user_already_exists', 'A user with email ' + email + ' already exists');
  }
}

