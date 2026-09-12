export interface SearchlayoutInterface {}
export interface ProductImage {
  id: number;
  url: string;
  isMain: boolean;
}

export interface ProductItem {
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

export interface ProductResponse {
  items: ProductItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  images: ProductImage[];
  categoryNames: string[];
}
