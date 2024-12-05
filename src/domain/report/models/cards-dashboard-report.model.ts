export interface CardsDashboardReportModel {
  today: {
    receivedPrice: number;
    salePrice: number;
    quantity: number;
  };
  yesterday: {
    receivedPrice: number;
    salePrice: number;
    quantity: number;
  };
  thisWeek: {
    receivedPrice: number;
    salePrice: number;
    quantity: number;
  };
  thisMonth: {
    receivedPrice: number;
    salePrice: number;
    quantity: number;
  };
}
