import { Product, SearchParams } from '@/types';

interface ApiResponse {
  products: Product[];
  filters: {
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
  };
  total: number;
  success: boolean;
}

export async function getProducts(
  searchParams: SearchParams
): Promise<ApiResponse> {
  const params = Object.fromEntries(
    Object.entries(searchParams).filter(([, value]) => value !== undefined) as [
      string,
      string
    ][]
  );

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(
      `${baseUrl}/api/products?${new URLSearchParams(params)}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return fallback data
    return {
      products: [],
      filters: {
        search: searchParams.search || '',
        category: searchParams.category || 'All',
        minPrice: Number(searchParams.minPrice) || 0,
        maxPrice: Number(searchParams.maxPrice) || 500,
      },
      total: 0,
      success: false,
    };
  }
}
