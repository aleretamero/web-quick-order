import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrderAction,
  CreateOrderDto,
} from "@/domain/orders/actions/create-order.action";
import { HttpError } from '@/lib/http/http-error';
import { useToast } from '@/hooks/use-toast.hook';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: CreateOrderDto) =>
      createOrderAction(data).then((response) => response),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/orders"],
      });
      toast.success("Pedido criado com sucesso");
    },
    onError: (error: HttpError) => {
      toast.error(error.data.errors);
    },
  });
}
