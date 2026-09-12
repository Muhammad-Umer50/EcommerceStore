export interface GetOrderInterface {
  orderDate: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingMethod: string;
  shippingCost: number;
  subtotal: number;
  tax: number;
  totalAmount: number;
  orderItems: OrderItem[];
  shippingAddressDetails: ShippingAddressDetails;
}
export enum OrderStatus {
  Pending = 0,
  Processing = 1,
  Shipped = 2,
  Delivered = 3,
  Cancelled = 4,
}

export enum PaymentStatus {
  Pending = 0,
  Paid = 1,
  Failed = 2,
  Refunded = 3,
}

export interface OrderItem {
  orderId: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface ShippingAddressDetails {
  address: string;
  city: string;
  country: string;
}

