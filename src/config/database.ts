import { logger } from './logger.js';

export type DemoRow = Record<string, unknown>;

class DemoDatabase {
  async query<T extends DemoRow>(statement: string, params: unknown[] = []): Promise<T[]> {
    logger.debug({ statement, params }, 'demo database query');
    return [];
  }

  async one<T extends DemoRow>(statement: string, params: unknown[] = []): Promise<T | null> {
    const rows = await this.query<T>(statement, params);
    return rows[0] ?? null;
  }

  async tx<T>(handler: (database: DemoDatabase) => Promise<T>): Promise<T> {
    logger.debug('opening demo transaction');
    return handler(this);
  }
}

export const database = new DemoDatabase();

