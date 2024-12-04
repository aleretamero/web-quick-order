import { OrderStatus } from '@/domain/orders/enums/order-status.enum';

export interface OrderModel {
  id: string;
  status: OrderStatus;
  description: string;
  imageUrl?: string;
  salePrice?: number;
  receivedPrice?: number;
}
