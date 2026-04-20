import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  fullName: z.string().min(2).max(120),
  role: z.enum(['owner', 'admin', 'member']).default('member'),
  status: z.enum(['invited', 'active', 'disabled']).default('invited'),
  teamId: z.string().min(8),
  timezone: z.string().default('America/New_York'),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

