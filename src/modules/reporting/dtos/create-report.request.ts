import { reportSchema } from '../schemas/report.schema.js';

export const createReportRequestSchema = reportSchema.pick({
  name: true,
  slug: true,
  format: true,
});
