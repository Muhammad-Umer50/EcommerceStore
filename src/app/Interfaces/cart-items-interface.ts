export interface CartItemsInterface {
  id: number;
  cartId: number;
  productId: number;
  cartProductDto: CartProductDto; // was CartProductDto (capital)
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
  isMain: boolean;
}
export interface ProductImage {
  id: number;
  url: string;
  isMain: boolean;
}

export interface CartProductDto {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  variant?: string;
  maxQuantity?: number;
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
