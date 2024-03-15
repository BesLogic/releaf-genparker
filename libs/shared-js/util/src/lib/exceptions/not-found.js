import { HttpError } from './http-error';

export class NotFound extends HttpError {
  constructor(message) {
    super(message, 404, 'Not Found', false);
  }
}
