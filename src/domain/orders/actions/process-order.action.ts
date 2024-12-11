import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";

export async function processOrderAction(id: string): Promise<HttpResponse> {
  return apiClient.put(`/orders/${id}/process`);
}
