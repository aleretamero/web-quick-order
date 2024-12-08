import { useQuery } from "@tanstack/react-query";
import { getOrderAction } from "@/domain/orders/actions/get-order.action";

export function useGetOrder(id?: string) {
  return useQuery({
    queryKey: ["/orders", id],
    queryFn: async () => {
      if (!id) return null;

      return getOrderAction(id).then((response) => response);
    },
    initialData: null,
  });
}
