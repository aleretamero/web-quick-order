import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { DateRangeQuery } from "@/services/api/api-types";
import { OrdersStatusReportModel } from "@/domain/report/models/orders-status-report.model";

export async function getOrdersStatusReport(
  query: DateRangeQuery
): Promise<HttpResponse<OrdersStatusReportModel>> {
  return apiClient.get<OrdersStatusReportModel>(`/reports/orders-status`, {
    params: {
      from: query.from.toISOString().split("T")[0],
      to: query.to.toISOString().split("T")[0],
    },
  });
}
