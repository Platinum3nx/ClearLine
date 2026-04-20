import { describe, expect, it } from 'vitest';
import { ReportingService } from '../../../src/modules/reporting/reporting.service.js';

describe('ReportingService', () => {
  it('lists saved reports', async () => {
    const repository = { listReports: async () => [{ id: 'report_001', teamId: 'team_demo_001', ownerId: 'user_001', name: 'Invoice aging', slug: 'invoice-aging', status: 'ready', format: 'csv', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }] } as any;
    const exporter = { exportRows: () => 'key,label,value' } as any;

    const service = new ReportingService(repository, exporter);
    const reports = await service.listReports({ page: 1, pageSize: 10 }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(reports[0].slug).toBe('invoice-aging');
  });

  it('runs reports through the exporter', async () => {
    const repository = {
      findById: async () => ({ id: 'report_001', teamId: 'team_demo_001', ownerId: 'user_001', name: 'Invoice aging', slug: 'invoice-aging', status: 'ready', format: 'csv', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }),
      runReport: async () => [{ key: 'paid', label: 'Paid invoices', value: 18 }],
    } as any;
    const exporter = { exportRows: () => 'key,label,value\npaid,Paid invoices,18' } as any;

    const service = new ReportingService(repository, exporter);
    const result = await service.runReport('report_001', { format: 'csv' }, { id: 'user_001', email: 'ops@clearline.dev', teamId: 'team_demo_001', roles: ['admin'] });

    expect(result.run.rowCount).toBe(1);
  });
});

