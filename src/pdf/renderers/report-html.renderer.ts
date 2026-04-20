import { buildReportDocument } from '../templates/report.template.js';

export function renderReportHtml(reportName: string, summary: string) {
  return buildReportDocument({ reportName, summary }).html;
}
