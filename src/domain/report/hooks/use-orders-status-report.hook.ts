import { useQuery } from "@tanstack/react-query";
import { useQuryParamsDateRange } from "@/hooks/use-query-params-data-range.hook";
import { getOrdersStatusReport } from "@/domain/report/actions/get-orders-status-report.action";

export function useGetOrdersStatusReport() {
  const { initialDate, finalDate } = useQuryParamsDateRange();
  return useQuery({
    queryKey: [`/reports/reports/orders-status`, initialDate, finalDate],
    queryFn: () => {
      if (!initialDate || !finalDate) {
        return null;
      }

      return getOrdersStatusReport({
        from: initialDate,
        to: finalDate,
      }).then((response) => response.data);
    },
    initialData: null,
  });
}
