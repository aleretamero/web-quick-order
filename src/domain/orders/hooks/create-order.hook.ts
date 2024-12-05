import { useMutation } from "@tanstack/react-query";
import {
  createOrderAction,
  CreateOrderDto,
} from "@/domain/orders/actions/create-order.action";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (data: CreateOrderDto) =>
      createOrderAction(data).then((response) => response),
  });
}
