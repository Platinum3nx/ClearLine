import { buildReportingRouter } from './reporting.routes.js';
import { ReportingController } from './reporting.controller.js';
import { ReportingRepository } from './reporting.repository.js';
import { ReportingService } from './reporting.service.js';
import { CsvExporter } from './exporters/csv-exporter.js';

export function createReportingModule() {
  const repository = new ReportingRepository();
  const exporter = new CsvExporter();
  const service = new ReportingService(repository, exporter);
  const controller = new ReportingController(service);

  return {
    router: buildReportingRouter(controller),
  };
}
