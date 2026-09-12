export interface CreateOrderInterface {
  items: CreateOrderItem[];
  shippingMethod: string;
  paymentMethod: string;
  shippingAddressDetails: ShippingLocation;
}

export interface CreateOrderItem {
  productId: number;
  quantity: number;
}

export interface ShippingLocation {
  address: string;
  city: string;
  country: string;
}
