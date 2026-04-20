import { AppError } from '../../../lib/errors.js';

export class PlanAlreadyExistsError extends AppError {
  constructor(planCode: string) {
    super(409, 'billing_plan_exists', 'Billing plan ' + planCode + ' already exists');
  }
}

