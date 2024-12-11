import { useQuery } from "@tanstack/react-query";
import { getOrdersCompletedReport } from "@/domain/report/actions/get-orders-completed-report.action";
import { useQueryParamsDateRange } from "@/hooks/use-query-params-data-range.hook";
import { useEffect } from "react";

export function useGetOrdersCompletedReport() {
  const { initialDate, finalDate, setDefaultDateRange } =
    useQueryParamsDateRange();

  useEffect(() => {
    if (!initialDate || !finalDate) setDefaultDateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
