import { processOrderAction } from "@/domain/orders/actions/process-order.action";
import { useToast } from '@/hooks/use-toast.hook';
import { HttpError } from '@/lib/http/http-error';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProcessOrder() {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) =>
      processOrderAction(id).then((response) => response),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["/orders", id],
      });
      toast.success("Pedido em processamento");
    },
    onError: (error: HttpError) => {
      toast.error(error.data.errors);
    },
  });
}
