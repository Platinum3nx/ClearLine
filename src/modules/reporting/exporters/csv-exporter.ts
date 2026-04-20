import type { ReportRow } from '../reporting.types.js';

export class CsvExporter {
  exportRows(rows: ReportRow[]) {
    const header = 'key,label,value';
    const body = rows.map((row) => [row.key, row.label, String(row.value)].join(',')).join('\n');
    return [header, body].filter(Boolean).join('\n');
  }
}
