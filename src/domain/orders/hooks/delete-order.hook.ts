import { deleteOrderAction } from "@/domain/orders/actions/delete-order.action";
import { useToast } from '@/hooks/use-toast.hook';
import { HttpError } from '@/lib/http/http-error';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) =>
      deleteOrderAction(id).then((response) => response),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["/orders", id],
      });
      toast.success("Pedido removido com sucesso");
    },
    onError: (error: HttpError) => {
      toast.error(error.data.errors);
    },
  });
}
