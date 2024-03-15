import { HttpError } from './http-error';

export class BadRequest extends HttpError {
  constructor(message) {
    super(message, 400, 'Object not formatted', false);
  }
}
