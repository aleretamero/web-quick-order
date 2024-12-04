import { HttpClient } from "@/lib/http/http-client";
import { TokenService } from "@/services/api/tokens-service";

export const apiClient = new HttpClient(import.meta.env.VITE_API_URL);

apiClient.interceptRequest((config) => {
  const { accessToken } = TokenService.getTokens();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
