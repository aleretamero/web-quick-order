import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { OrderModel } from "@/domain/orders/models/order.model";
import { formatDate } from "@/helpers/formats/format-date.helper";

export type CreateOrderDto = {
  date: Date;
  description: string;
  salePrice: number;
  receivedPrice: number;
  image: File;
};

export async function createOrderAction({
  date,
  description,
  salePrice,
  receivedPrice,
  image,
}: CreateOrderDto): Promise<HttpResponse<OrderModel>> {
  const formData = new FormData();

  formData.append("date", formatDate(date, "YYYY-MM-DD"));
  formData.append("description", description);
  formData.append("salePrice", salePrice.toString());
  formData.append("receivedPrice", receivedPrice.toString());
  formData.append("image", image);

  return apiClient.post<OrderModel>(`/orders`, formData);
}
