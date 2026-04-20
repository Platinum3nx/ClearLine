import { logger } from '../../config/logger.js';
import type { RenderedEmail } from '../types.js';

export class ConsoleEmailProvider {
  async send(to: string, email: RenderedEmail) {
    logger.info({ to, subject: email.subject }, 'dispatching email through console provider');
  }
}
