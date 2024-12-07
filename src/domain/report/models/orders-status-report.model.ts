import { OrderStatus } from '@/domain/orders/enums/order-status.enum';

export interface OrdersStatusReportModel {
  startDate: string;
  endDate: string;
  data: {
    status: OrderStatus;
    quantity: number;
  }[];
}
