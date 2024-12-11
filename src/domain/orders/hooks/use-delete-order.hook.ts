import { deleteOrderAction } from "@/domain/orders/actions/delete-order.action";
import { useToast } from '@/hooks/use-toast.hook';
import { HttpError } from '@/lib/http/http-error';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router';

export function useDeleteOrder() {
  const navigate = useNavigate();
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
      navigate("/orders")
    },
    onError: (error: HttpError) => {
      toast.error(error.data.errors);
    },
  });
}
