import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";

export async function deleteOrderAction(id: string): Promise<HttpResponse> {
  return apiClient.delete(`/orders/${id}`);
}
