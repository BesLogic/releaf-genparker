export class HttpError extends Error {
  constructor(message, errorCode, name, withStack) {
    super(message);
    this.errorCode = errorCode;
    this.name = name;
    this.message = `${name}: ${errorCode} - ${message}`;
    this.stack = withStack ? this.stack : null;
  }
}
