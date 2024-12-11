import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { OrdersCompletedReportModel } from "@/domain/report/models/orders-completed-report.model";
import { DateRangeQuery } from "@/services/api/api-types";

export async function getOrdersCompletedReport(
  query: DateRangeQuery
): Promise<HttpResponse<OrdersCompletedReportModel>> {
  return apiClient.get<OrdersCompletedReportModel>(
    `/reports/orders-completed`,
    {
      params: {
        from: query.from?.toISOString().split("T")[0],
        to: query.to?.toISOString().split("T")[0],
      },
    }
  );
}
