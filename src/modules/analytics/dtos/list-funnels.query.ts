import { z } from 'zod';

export const listFunnelsQuerySchema = z.object({
  includeBenchmarks: z.coerce.boolean().default(false),
});
