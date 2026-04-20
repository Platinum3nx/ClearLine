import { teamSchema } from '../schemas/team.schema.js';

export const createTeamRequestSchema = teamSchema.pick({
  name: true,
  slug: true,
  seatLimit: true,
  defaultCurrency: true,
});

