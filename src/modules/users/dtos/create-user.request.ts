import { userSchema } from '../schemas/user.schema.js';

export const createUserRequestSchema = userSchema.pick({
  email: true,
  fullName: true,
  role: true,
  teamId: true,
  timezone: true,
});

