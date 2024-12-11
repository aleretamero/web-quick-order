import { useQuery } from "@tanstack/react-query";
import { useQueryParamsDateRange } from "@/hooks/use-query-params-data-range.hook";
import { getOrdersStatusReport } from "@/domain/report/actions/get-orders-status-report.action";
import { useEffect } from "react";

export function useGetOrdersStatusReport() {
  const { initialDate, finalDate, setDefaultDateRange } =
    useQueryParamsDateRange();

  useEffect(() => {
    if (!initialDate || !finalDate) setDefaultDateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
