import { z } from 'zod';

export const postChannelMessageRequestSchema = z.object({
  channelId: z.string().min(2),
  text: z.string().min(1).max(4000),
});
