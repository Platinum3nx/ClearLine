import { AppError } from '../../../lib/errors.js';

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(401, 'invalid_credentials', 'Invalid email or password');
  }
}

export class ApiKeyScopeError extends AppError {
  constructor(scope: string) {
    super(403, 'api_key_scope_missing', 'API key is missing required scope: ' + scope);
  }
}

