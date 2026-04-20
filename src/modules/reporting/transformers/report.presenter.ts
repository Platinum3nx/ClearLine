import type { ReportRecord } from '../reporting.types.js';

export function presentSavedReport(report: ReportRecord) {
  return {
    id: report.id,
    name: report.name,
    slug: report.slug,
    status: report.status,
    format: report.format,
  };
}

export function presentReportRun(report: ReportRecord, run: { reportId: string; rowCount: number; format: string; artifactPreview: string }) {
  return {
    report: presentSavedReport(report),
    run,
  };
}
