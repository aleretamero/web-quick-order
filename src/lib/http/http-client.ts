import axios, { AxiosInstance, isAxiosError } from "axios";
import { HttpError } from "@/lib/http/http-error";
import { HttpResponse } from "@/lib/http/http-response";
import { Config, Options, Response } from "@/lib/http/http-types";

export class HttpClient {
  private client: AxiosInstance;

  constructor(baseURL?: string) {
    this.client = axios.create({ baseURL });
  }

  interceptRequest(
    callback: (config: Config) => any,
    errorCallback?: (error: Error) => any
  ) {
    this.client.interceptors.request.use(callback, errorCallback);
  }

  interceptResponse<T>(
    callback: (response: Response<T>) => any,
    errorCallback?: (error: Error) => any
  ) {
    this.client.interceptors.response.use(callback, errorCallback);
  }

  get<T = any>(path: string, options?: Options): Promise<HttpResponse<T>> {
    const promise = this.client.get<T>(path, {
      params: options?.params,
      headers: options?.headers,
    });

    return this.mapperResponse(promise);
  }

  post<T = any, Body = any>(
    path: string,
    body?: Body | FormData,
    options?: Options
  ): Promise<HttpResponse<T>> {
    const contentType =
      body instanceof FormData ? "multipart/form-data" : "application/json";

    const promise = this.client.post<T>(path, body, {
      params: options?.params,
      headers: {
        "Content-Type": contentType,
        ...options?.headers,
      },
    });

    return this.mapperResponse(promise);
  }

  put<T = any, Body = any>(
    path: string,
    body?: Body | FormData,
    options?: Options
  ): Promise<HttpResponse<T>> {
    const contentType =
      body instanceof FormData ? "multipart/form-data" : "application/json";

    const promise = this.client.put<T>(path, body, {
      params: options?.params,
      headers: {
        "Content-Type": contentType,
        ...options?.headers,
      },
    });

    return this.mapperResponse(promise);
  }

  patch<T = any, Body = any>(
    path: string,
    body?: Body | FormData,
    options?: Options
  ): Promise<HttpResponse<T>> {
    const contentType =
      body instanceof FormData ? "multipart/form-data" : "application/json";

    const promise = this.client.put<T>(path, body, {
      params: options?.params,
      headers: {
        "Content-Type": contentType,
        ...options?.headers,
      },
    });

    return this.mapperResponse(promise);
  }

  delete<T = any>(path: string, options?: Options): Promise<HttpResponse<T>> {
    const promise = this.client.delete<T>(path, {
      params: options?.params,
      headers: options?.headers,
    });

    return this.mapperResponse(promise);
  }

  private async mapperResponse<T>(
    promise: Promise<Response<T>>
  ): Promise<HttpResponse<T>> {
    try {
      const { data, status } = await promise;

      return new HttpResponse(status, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { data, status } = error.response as Response;

        throw new HttpError(status, data);
      }

      throw new HttpError(500, { message: "Internal server error" });
    }
  }
}
