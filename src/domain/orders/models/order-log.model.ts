import { OrderStatus } from '@/domain/orders/enums/order-status.enum';

export interface OrderLogModel {
  id: string;
  orderId: string;
  beforeState: OrderStatus | null;
  afterState: OrderStatus | null;
  createdAt: string;
  userId: string;
  userEmail: string;
}
