import { teamSchema } from '../schemas/team.schema.js';

export const updateTeamRequestSchema = teamSchema.pick({
  name: true,
  seatLimit: true,
  defaultCurrency: true,
}).partial();

