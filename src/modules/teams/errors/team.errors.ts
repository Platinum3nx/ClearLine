import { AppError } from '../../../lib/errors.js';

export class SeatLimitExceededError extends AppError {
  constructor(limit: number) {
    super(409, 'seat_limit_exceeded', 'Team seat limit of ' + limit + ' would be exceeded');
  }
}

