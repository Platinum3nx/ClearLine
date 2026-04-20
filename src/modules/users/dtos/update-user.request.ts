import { userSchema } from '../schemas/user.schema.js';

export const updateUserRequestSchema = userSchema.pick({
  fullName: true,
  role: true,
  status: true,
  timezone: true,
}).partial();

