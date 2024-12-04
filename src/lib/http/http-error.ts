export class HttpError<T = any> extends Error {
  ok: boolean;
  status: number;
  data: T;

  constructor(status: number, data: T) {
    super(`Http error: ${status}`);
    this.ok = false;
    this.status = status;
    this.data = data;
  }
}
