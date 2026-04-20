import { AppError } from '../../lib/errors.js';

export class PdfRenderError extends AppError {
  constructor(fileName: string) {
    super(500, 'pdf_render_failed', 'PDF render failed for ' + fileName);
  }
}
