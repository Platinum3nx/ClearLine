import type { TeamRecord } from '../teams.types.js';

export function presentTeam(team: TeamRecord) {
  return {
    id: team.id,
    name: team.name,
    slug: team.slug,
    seatLimit: team.seatLimit,
    seatCount: team.seatCount,
    defaultCurrency: team.defaultCurrency,
  };
}

