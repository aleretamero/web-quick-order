import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { OrderModel } from "@/domain/orders/models/order.model";
import { PaginationResponse } from "@/services/api/api-types";

type GetOrdersActionParams = {
  page: number;
  limit: number;
};

export async function getOrdersAction({
  limit,
  page,
}: GetOrdersActionParams): Promise<
  HttpResponse<PaginationResponse<OrderModel>>
> {
  return apiClient.get<PaginationResponse<OrderModel>>(`/orders`, {
    params: {
      limit,
      page,
    },
  });
}
