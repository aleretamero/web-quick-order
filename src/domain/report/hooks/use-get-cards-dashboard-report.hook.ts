import { useQuery } from "@tanstack/react-query";
import { getCardsDashboardReport } from "@/domain/report/actions/get-cards-dashboard-report.action";

export function useGetCardsDashboardReport() {
  return useQuery({
    queryKey: [`/reports/dashboard-cards`],
    queryFn: () => getCardsDashboardReport().then((response) => response.data),
    initialData: null,
  });
}
