import { OrderStatus } from '@/domain/orders/enums/order-status.enum';
import { OrderLogModel } from '@/domain/orders/models/order-log.model';

export interface OrderModel {
  id: string;
  date: string;
  status: OrderStatus;
  description: string;
  imageUrl?: string;
  salePrice?: number;
  receivedPrice?: number;
  orderLogs?: OrderLogModel[];
}
