import { z } from 'zod';

export const authCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12).max(128),
});

export const registrationSchema = authCredentialsSchema.extend({
  fullName: z.string().min(2).max(120),
  companyName: z.string().min(2).max(160),
});

