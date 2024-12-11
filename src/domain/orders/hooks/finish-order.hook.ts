import { finishOrderAction } from "@/domain/orders/actions/finish-order.action";
import { useToast } from "@/hooks/use-toast.hook";
import { HttpError } from "@/lib/http/http-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFinishOrder() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) =>
      finishOrderAction(id).then((response) => response),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["/orders", id],
      });
      toast.success("Pedido finalizado com sucesso");
    },
    onError: (error: HttpError) => {
      toast.error(error.data.errors);
    },
  });
}
