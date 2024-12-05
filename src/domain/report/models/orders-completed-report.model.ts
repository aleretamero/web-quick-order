export interface OrdersCompletedReportModel {
  startDate: string;
  endDate: string;
  data: {
    date: string;
    value: number
    quantity: number;
  }[];
}
