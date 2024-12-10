export type QueryParams = { [key: string]: unknown } | URLSearchParams;

export type Headers = { [key: string]: string };

export type Options = {
  params?: QueryParams;
  headers?: Headers;
};

export type Config = {
  headers: Headers;
};

export type Response<T = any> = {
  data: T;
  status: number;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
  errors: string[];
}
