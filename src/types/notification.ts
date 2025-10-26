export enum NotificationType {
  ORDER_STATUS = 'ORDER_STATUS',
  PROMOTIONAL = 'PROMOTIONAL',
  SYSTEM = 'SYSTEM',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  data?: {
    orderId?: string;
    productId?: string;
    url?: string;
  };
}


