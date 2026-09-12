export interface ProductInterface {
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
  categories: string[];
}
export interface ProductImage {
  id: number;
  url: string;
  isMain: boolean;
}

export interface PagedResult<T> {
 items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface categoriesInterface{
  id:number;
  name:string;
}
