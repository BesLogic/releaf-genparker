import { HttpError } from './http-error';

export class Unauthorized extends HttpError {
  constructor(message) {
    super(message, 401, 'Unauthorized', false);
  }
}
