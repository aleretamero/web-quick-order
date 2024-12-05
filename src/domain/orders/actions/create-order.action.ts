import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { OrderModel } from "@/domain/orders/models/order.model";
import { PaginationResponse } from "@/services/api/api-types";

export type CreateOrderDto = {
  description: string;
  salePrice: number;
  receivedPrice: number;
  image: File;
};

export async function createOrderAction({
  description,
  salePrice,
  receivedPrice,
  image,
}: CreateOrderDto): Promise<HttpResponse<PaginationResponse<OrderModel>>> {
  const formData = new FormData();

  formData.append("description", description);
  formData.append("salePrice", salePrice.toString());
  formData.append("receivedPrice", receivedPrice.toString());
  formData.append("image", image);

  return apiClient.post<PaginationResponse<OrderModel>>(`/orders`, formData);
}
