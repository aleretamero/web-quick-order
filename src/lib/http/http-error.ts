import { ErrorResponse } from "@/lib/http/http-types";

export class HttpError extends Error {
  ok: boolean;
  status: number;
  data: ErrorResponse;

  constructor(status: number, data: ErrorResponse) {
    super(`Http error: ${status}`);
    this.ok = false;
    this.status = status;
    this.data = data;
  }
}
