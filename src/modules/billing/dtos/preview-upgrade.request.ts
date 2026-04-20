import { z } from 'zod';

export const previewUpgradeRequestSchema = z.object({
  currentPlanCode: z.string().min(2),
  requestedPlanCode: z.string().min(2),
  seatDelta: z.coerce.number().int().min(1),
  countryCode: z.string().length(2).default('US'),
});

