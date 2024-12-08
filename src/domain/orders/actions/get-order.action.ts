import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { OrderModel } from "@/domain/orders/models/order.model";

export async function getOrderAction(
  id: string
): Promise<HttpResponse<OrderModel>> {
  return apiClient.get<OrderModel>(`/orders/${id}`);
}
