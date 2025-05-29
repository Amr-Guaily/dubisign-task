export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface SearchParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}
