import { SignJWT, jwtVerify } from 'jose';
import { env } from '../../../config/env.js';
import type { AccessTokenPayload, AuthenticatedPrincipal } from '../auth.types.js';

const secret = new TextEncoder().encode(env.JWT_SECRET);

export async function signAccessToken(payload: AccessTokenPayload) {
  return new SignJWT({ email: payload.email, teamId: payload.teamId, roles: payload.roles })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuer(env.JWT_ISSUER)
    .setAudience(env.JWT_AUDIENCE)
    .setExpirationTime('15m')
    .sign(secret);
}

export async function signRefreshToken(payload: AccessTokenPayload) {
  return new SignJWT({ email: payload.email, teamId: payload.teamId, roles: payload.roles, kind: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuer(env.JWT_ISSUER)
    .setAudience(env.JWT_AUDIENCE)
    .setExpirationTime('30d')
    .sign(secret);
}

export async function verifyAccessToken(token: string): Promise<AuthenticatedPrincipal> {
  const result = await jwtVerify(token, secret, {
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });

  return {
    id: String(result.payload.sub),
    email: String(result.payload.email),
    teamId: String(result.payload.teamId),
    roles: Array.isArray(result.payload.roles) ? result.payload.roles.map(String) : [],
  };
}

export async function verifyRefreshToken(token: string): Promise<AccessTokenPayload> {
  const result = await jwtVerify(token, secret, {
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
  });

  return {
    sub: String(result.payload.sub),
    email: String(result.payload.email),
    teamId: String(result.payload.teamId),
    roles: Array.isArray(result.payload.roles) ? result.payload.roles.map(String) : [],
  };
}

