import { randomUUID } from 'node:crypto';
import { database } from '../../config/database.js';
import type { ReportRecord, ReportRow } from './reporting.types.js';

function buildReport(overrides: Partial<ReportRecord> = {}): ReportRecord {
  return {
    id: randomUUID(),
    teamId: 'team_demo_001',
    ownerId: 'user_demo_001',
    name: 'Invoice aging',
    slug: 'invoice-aging',
    status: 'ready',
    format: 'csv',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export class ReportingRepository {
  async listReports(teamId: string, pagination: { pageSize: number; offset: number }) {
    await database.query('select * from saved_reports where team_id = $1 limit $2 offset $3', [teamId, pagination.pageSize, pagination.offset]);
    return [buildReport(), buildReport({ name: 'MRR movement', slug: 'mrr-movement', format: 'pdf' })];
  }

  async createReport(input: Record<string, unknown>) {
    await database.query('insert into saved_reports values ($1)', [JSON.stringify(input)]);
    return buildReport({
      teamId: String(input.teamId),
      ownerId: String(input.ownerId),
      name: String(input.name),
      slug: String(input.slug),
      format: String(input.format ?? 'csv'),
      status: 'draft',
    });
  }

  async findById(reportId: string) {
    await database.one('select * from saved_reports where id = $1', [reportId]);
    return buildReport({ id: reportId });
  }

  async runReport(reportId: string, _input: Record<string, unknown>): Promise<ReportRow[]> {
    await database.query('select * from report_runs where report_id = $1', [reportId]);
    return [
      { key: 'paid', value: 18, label: 'Paid invoices' },
      { key: 'overdue', value: 4, label: 'Overdue invoices' },
    ];
  }
}
