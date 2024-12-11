import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { OrderModel } from "@/domain/orders/models/order.model";
import { DateRangeQuery, PaginationResponse } from "@/services/api/api-types";

type GetOrdersActionParams = {
  page: number;
  limit: number;
  status: string[];
} & DateRangeQuery;

export async function getOrdersAction(
  query: GetOrdersActionParams
): Promise<HttpResponse<PaginationResponse<OrderModel>>> {
  const params = new URLSearchParams();

  params.append("limit", query.limit.toString());
  params.append("page", query.page.toString());
  query.status.forEach((status) => params.append("status", status));
  if (query.from) params.append("from", query.from.toISOString().split("T")[0]);
  if (query.to) params.append("to", query.to.toISOString().split("T")[0]);

  return apiClient.get<PaginationResponse<OrderModel>>(`/orders`, {
    params,
  });
}
