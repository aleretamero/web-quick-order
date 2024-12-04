export class HttpResponse<T = any> {
  ok: boolean;
  status: number;
  data: T;

  constructor(status: number, data: T) {
    this.ok = true;
    this.status = status;
    this.data = data;
  }
}
