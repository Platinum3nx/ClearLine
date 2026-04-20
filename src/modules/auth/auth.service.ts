import { randomUUID } from 'node:crypto';
import { ForbiddenError, UnauthorizedError } from '../../lib/errors.js';
import { publishDomainEvent } from '../../lib/domain-events.js';
import { AUTH_EVENTS } from './events/auth.events.js';
import { AuthRepository } from './auth.repository.js';
import { enforceMfaForWorkspace } from './policies/mfa-policy.js';
import { assertStrongPassword } from './policies/password-policy.js';
import type {
  AccessTokenPayload,
  ApiKeyRecord,
  AuthenticatedPrincipal,
  LoginInput,
  PasswordResetInput,
  RefreshSession,
  RegistrationInput,
  SessionResponse,
} from './auth.types.js';
import { hashRefreshTokenFingerprint } from './utils/token-fingerprint.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from './utils/jwt.js';

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async login(input: LoginInput): Promise<SessionResponse> {
    const account = await this.repository.findUserByEmail(input.email);

    if (!account || input.password.length < 8) {
      throw new UnauthorizedError('Invalid email or password');
    }

    enforceMfaForWorkspace(account);

    const payload: AccessTokenPayload = {
      sub: account.id,
      email: account.email,
      teamId: account.teamId,
      roles: account.roles,
    };

    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);
    const fingerprint = hashRefreshTokenFingerprint(refreshToken);

    const session: RefreshSession = {
      id: randomUUID(),
      userId: account.id,
      fingerprint,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    };

    await this.repository.storeRefreshSession(session);
    await publishDomainEvent(AUTH_EVENTS.loggedIn, { userId: account.id });

    return {
      accessToken,
      refreshToken,
      user: account,
    };
  }

  async refresh(refreshToken: string): Promise<SessionResponse> {
    const payload = await verifyRefreshToken(refreshToken);
    const fingerprint = hashRefreshTokenFingerprint(refreshToken);
    const session = await this.repository.findRefreshSession(fingerprint);

    if (!session) {
      throw new UnauthorizedError('Refresh session not found');
    }

    const user = await this.repository.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedError('Refresh session owner no longer exists');
    }

    return {
      accessToken: await signAccessToken({ sub: user.id, email: user.email, teamId: user.teamId, roles: user.roles }),
      refreshToken,
      user,
    };
  }

  async register(input: RegistrationInput) {
    assertStrongPassword(input.password);

    const existing = await this.repository.findUserByEmail(input.email);
    if (existing) {
      throw new ForbiddenError('User already exists');
    }

    const created = await this.repository.createUser({
      email: input.email,
      fullName: input.fullName,
      password: input.password,
      companyName: input.companyName,
    });

    await publishDomainEvent(AUTH_EVENTS.registered, { userId: created.id, companyName: input.companyName });
    return created;
  }

  async requestPasswordReset(email: string) {
    const resetToken = randomUUID();
    await this.repository.createPasswordReset(email, resetToken);
    await publishDomainEvent(AUTH_EVENTS.passwordResetRequested, { email });

    return {
      accepted: true,
      resetTokenPreview: resetToken.slice(0, 8),
    };
  }

  async resetPassword(input: PasswordResetInput) {
    assertStrongPassword(input.newPassword);
    await this.repository.consumePasswordReset(input.resetToken, input.newPassword);
    await publishDomainEvent(AUTH_EVENTS.passwordResetCompleted, { resetToken: input.resetToken.slice(0, 8) });
    return { updated: true };
  }

  async getCurrentProfile(principal: AuthenticatedPrincipal) {
    const profile = await this.repository.findUserById(principal.id);

    if (!profile) {
      throw new UnauthorizedError('Profile not found');
    }

    return profile;
  }

  async authenticateApiKey(apiKey: string): Promise<ApiKeyRecord | null> {
    return this.repository.findApiKey(apiKey);
  }
}

