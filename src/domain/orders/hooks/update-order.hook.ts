import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateOrderAction,
  UpdateOrderDto,
} from "@/domain/orders/actions/update-order.action";
import { HttpError } from "@/lib/http/http-error";
import { useToast } from "@/hooks/use-toast.hook";

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateOrderDto & { id: string }) =>
      updateOrderAction(id, data).then((response) => response),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["/orders", id],
      });
      toast.success("Pedido atualizado com sucesso");
    },
    onError: (error: HttpError) => {
      toast.error(error.data.errors);
    },
  });
}
