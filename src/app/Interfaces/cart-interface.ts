
export interface CartProductDto {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  variant?: string;
  stockQuantity?: number;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  cartProductDto: CartProductDto;
  quantity: number;
}

export interface BillingDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface ShippingLocation {
  address: string;
  city: string;
  country: string;
}

export interface ShippingMethod {
  label: string;
  value: string;
  price: number;
}
export interface ProductImage {
  id: number;
  url: string;
  isMain: boolean;
}
