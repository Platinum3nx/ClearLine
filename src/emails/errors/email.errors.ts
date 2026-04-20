import { AppError } from '../../lib/errors.js';

export class EmailRenderError extends AppError {
  constructor(template: string) {
    super(500, 'email_render_failed', 'Email render failed for template ' + template);
  }
}
