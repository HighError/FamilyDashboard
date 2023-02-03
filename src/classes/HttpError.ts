export default class HttpError extends Error {
  code = 0;
  constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
