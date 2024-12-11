import { cancelOrderAction } from "@/domain/orders/actions/cancel-order.action";
import { useToast } from "@/hooks/use-toast.hook";
import { HttpError } from "@/lib/http/http-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCancelOrder() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) =>
      cancelOrderAction(id).then((response) => response),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["/orders", id],
      });
      toast.success("Pedido cancelado com sucesso");
    },
    onError: (error: HttpError) => {
      toast.error(error.data.errors);
    },
  });
}
