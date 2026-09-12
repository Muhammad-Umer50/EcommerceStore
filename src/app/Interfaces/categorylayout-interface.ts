export interface CategorylayoutInterface {
  id: number;
  name: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  priceTotal: number;
  priceDiscount: number;
  isAvailable: boolean;
  stockQuantity: number;
  rating: number;
  images: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
  isMain: boolean;
}
