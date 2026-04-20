export type UserStatus = 'invited' | 'active' | 'disabled';
export type UserRole = 'owner' | 'admin' | 'member';

export interface UserRecord {
  id: string;
  email: string;
  fullName: string;
  status: UserStatus;
  role: UserRole;
  teamId: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

