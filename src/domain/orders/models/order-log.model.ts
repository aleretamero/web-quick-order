import { OrderLogsAction } from '@/domain/orders/enums/order-logs-action.enum';
import { OrderStatus } from '@/domain/orders/enums/order-status.enum';

export interface OrderLogModel {
  id: string;
  orderId: string;
  action: OrderLogsAction;
  beforeState: OrderStatus | null;
  afterState: OrderStatus | null;
  createdAt: string;
  userId: string;
  userEmail: string;
}
