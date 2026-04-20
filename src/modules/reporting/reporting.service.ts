import { publishDomainEvent } from '../../lib/domain-events.js';
import { normalizePagination } from '../../lib/pagination.js';
import type { AuthenticatedPrincipal } from '../auth/auth.types.js';
import { REPORT_EVENTS } from './events/report.events.js';
import { CsvExporter } from './exporters/csv-exporter.js';
import { assertReportingAccess } from './policies/report-access.policy.js';
import { ReportingRepository } from './reporting.repository.js';
import { presentReportRun, presentSavedReport } from './transformers/report.presenter.js';

export class ReportingService {
  constructor(
    private readonly repository: ReportingRepository,
    private readonly exporter: CsvExporter,
  ) {}

  async listReports(query: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertReportingAccess(actor.roles);
    const pagination = normalizePagination({
      page: Number(query.page ?? 1),
      pageSize: Number(query.pageSize ?? 25),
    });
    const reports = await this.repository.listReports(actor.teamId, pagination);

    return reports.map(presentSavedReport);
  }

  async createReport(input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertReportingAccess(actor.roles);
    const report = await this.repository.createReport({
      ...input,
      ownerId: actor.id,
      teamId: actor.teamId,
    });
    await publishDomainEvent(REPORT_EVENTS.created, { actorId: actor.id, reportId: report.id });
    return presentSavedReport(report);
  }

  async runReport(reportId: string, input: Record<string, unknown>, actor: AuthenticatedPrincipal) {
    assertReportingAccess(actor.roles);
    const report = await this.repository.findById(reportId);
    const rows = await this.repository.runReport(reportId, input);
    const artifact = this.exporter.exportRows(rows);

    await publishDomainEvent(REPORT_EVENTS.runCompleted, { actorId: actor.id, reportId, rowCount: rows.length });

    return presentReportRun(report, {
      reportId,
      rowCount: rows.length,
      format: String(input.format ?? 'csv'),
      artifactPreview: artifact.slice(0, 120),
    });
  }
}
