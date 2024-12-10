import { deleteOrderAction } from "@/domain/orders/actions/delete-order.action";
import { useMutation } from "@tanstack/react-query";

export function useDeleteOrder() {
  return useMutation({
    mutationFn: (id: string) =>
      deleteOrderAction(id).then((response) => response),
  });
}
