import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";

export async function logoutAction(): Promise<HttpResponse> {
  return apiClient.post("/auth/logout");
}
