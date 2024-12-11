import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { OrderModel } from "@/domain/orders/models/order.model";
import { formatDate } from "@/helpers/formats/format-date.helper";

export type UpdateOrderDto = {
  date?: Date;
  description?: string;
  salePrice?: number;
  receivedPrice?: number;
  image?: File;
};

export async function updateOrderAction(
  id: string,
  { date, description, salePrice, receivedPrice, image }: UpdateOrderDto
): Promise<HttpResponse<OrderModel>> {
  const formData = new FormData();

  if (date) formData.append("date", formatDate(date, "YYYY-MM-DD"));
  if (description) formData.append("description", description);
  if (salePrice) formData.append("salePrice", salePrice.toString());
  if (receivedPrice) formData.append("receivedPrice", receivedPrice.toString());
  if (image) formData.append("image", image);

  return apiClient.patch<OrderModel>(`/orders/${id}`, formData);
}
