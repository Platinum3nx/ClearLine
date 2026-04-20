import type { AuthService } from '../auth.service.js';
import { ApiKeyScopeError } from '../errors/auth.errors.js';

export async function authorizeApiKey(service: AuthService, rawApiKey: string, requiredScope: string) {
  const apiKey = await service.authenticateApiKey(rawApiKey);

  if (!apiKey || !apiKey.scopes.includes(requiredScope)) {
    throw new ApiKeyScopeError(requiredScope);
  }

  return apiKey;
}

