import Filters from '@/components/Filters';
import ProductGrid from '@/components/ProductGrid';
import { CategoryProvider } from '@/context/CategoryContext';
import { SearchProvider } from '@/context/SearchContext';
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

async function getProducts(searchParams: SearchParams): Promise<ApiResponse> {
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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const products = await getProducts(params);

  console.log('Fetched products:', products);

  return (
    <div className="container px-4 sm:px-6 md:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchProvider initialSearch={params.search}>
          <CategoryProvider initialCategory={params.category}>
            {/* Sidebar Filters */}
            <Filters />

            {/* Main Content */}
            <div className="flex-1">
              <ProductGrid products={products.products} />
            </div>
          </CategoryProvider>
        </SearchProvider>
      </div>
    </div>
  );
}
