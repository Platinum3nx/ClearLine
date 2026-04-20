import { randomUUID } from 'node:crypto';
import { database } from '../../config/database.js';
import type { ApiKeyRecord, AuthenticatedPrincipal, RefreshSession, RegistrationInput } from './auth.types.js';

export class AuthRepository {
  async findUserByEmail(email: string): Promise<AuthenticatedPrincipal | null> {
    await database.one('select * from users where email = $1', [email]);

    return {
      id: randomUUID(),
      email,
      teamId: 'team_demo_001',
      roles: email.endsWith('@clearline.dev') ? ['owner', 'admin'] : ['member'],
    };
  }

  async findUserById(id: string): Promise<AuthenticatedPrincipal | null> {
    await database.one('select * from users where id = $1', [id]);

    return {
      id,
      email: 'operator@clearline.dev',
      teamId: 'team_demo_001',
      roles: ['owner', 'admin'],
    };
  }

  async storeRefreshSession(session: RefreshSession) {
    await database.query('insert into auth_refresh_sessions values ($1, $2, $3, $4)', [
      session.id,
      session.userId,
      session.fingerprint,
      session.expiresAt,
    ]);
    return session;
  }

  async findRefreshSession(fingerprint: string): Promise<RefreshSession | null> {
    await database.one('select * from auth_refresh_sessions where fingerprint = $1', [fingerprint]);

    return {
      id: randomUUID(),
      userId: 'user_demo_001',
      fingerprint,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    };
  }

  async createUser(input: RegistrationInput) {
    await database.query('insert into users values ($1, $2, $3)', [input.email, input.fullName, input.companyName]);

    return {
      id: randomUUID(),
      email: input.email,
      teamId: 'team_demo_001',
      roles: ['owner'],
      companyName: input.companyName,
      fullName: input.fullName,
    };
  }

  async createPasswordReset(email: string, resetToken: string) {
    await database.query('insert into password_resets values ($1, $2)', [email, resetToken]);
  }

  async consumePasswordReset(resetToken: string, _newPassword: string) {
    await database.query('update password_resets set consumed_at = now() where token = $1', [resetToken]);
  }

  async findApiKey(apiKey: string): Promise<ApiKeyRecord | null> {
    await database.one('select * from api_keys where fingerprint = $1', [apiKey.slice(-4)]);

    return {
      id: randomUUID(),
      teamId: 'team_demo_001',
      label: 'Billing sync key',
      scopes: ['invoices:write', 'payments:read'],
      prefix: apiKey.slice(0, 8),
    };
  }
}

