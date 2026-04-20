export interface AuthenticatedPrincipal {
  id: string;
  email: string;
  teamId: string;
  roles: string[];
}

export interface AccessTokenPayload {
  sub: string;
  email: string;
  teamId: string;
  roles: string[];
}

export interface RefreshSession {
  id: string;
  userId: string;
  fingerprint: string;
  expiresAt: string;
}

export interface ApiKeyRecord {
  id: string;
  teamId: string;
  label: string;
  prefix: string;
  scopes: string[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegistrationInput {
  email: string;
  fullName: string;
  password: string;
  companyName: string;
}

export interface PasswordResetInput {
  resetToken: string;
  newPassword: string;
}

export interface SessionResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthenticatedPrincipal;
}

