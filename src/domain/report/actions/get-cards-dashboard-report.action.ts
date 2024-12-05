import { HttpResponse } from "@/lib/http/http-response";
import { apiClient } from "@/services/api/api-service";
import { CardsDashboardReportModel } from "@/domain/report/models/cards-dashboard-report.model";

export async function getCardsDashboardReport(): Promise<
  HttpResponse<CardsDashboardReportModel>
> {
  return apiClient.get<CardsDashboardReportModel>(`/reports/dashboard-cards`);
}
