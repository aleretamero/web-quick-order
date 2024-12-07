import { useQuery } from "@tanstack/react-query";
import { getOrdersCompletedReport } from "@/domain/report/actions/get-orders-completed-report.action";
import { useQuryParamsDateRange } from "@/hooks/use-query-params-data-range.hook";

export function useGetOrdersCompletedReport() {
  const { initialDate, finalDate } = useQuryParamsDateRange();
  return useQuery({
    queryKey: [`/reports/reports/orders-completed`, initialDate, finalDate],
    queryFn: () => {
      if (!initialDate || !finalDate) {
        return null;
      }

      return getOrdersCompletedReport({
        from: initialDate,
        to: finalDate,
      }).then((response) => response.data);
    },
    initialData: null,
  });
}
