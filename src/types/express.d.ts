import 'express';

declare global {
  namespace Express {
    interface UserContext {
      id: string;
      email: string;
      teamId: string;
      roles: string[];
    }

    interface Request {
      requestId?: string;
      tenantId?: string;
      user?: UserContext;
    }
  }
}

export {};

