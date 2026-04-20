import { AppError } from '../../../../lib/errors.js';

export class SalesforceSyncError extends AppError {
  constructor(externalAccountId: string) {
    super(409, 'salesforce_sync_failed', 'Salesforce sync failed for ' + externalAccountId);
  }
}
