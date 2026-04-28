import { z } from 'zod';

export const listVersionsQuerySchema = z.object({
  includeDeprecated: z
    .union([z.boolean(), z.enum(['true', 'false'])])
    .transform((value) => value === true || value === 'true')
    .default(true),
});

export type ListVersionsQuery = z.infer<typeof listVersionsQuerySchema>;
