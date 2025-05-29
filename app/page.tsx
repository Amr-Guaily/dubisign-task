import ActiveFilters from '@/components/ActiveFilters';
import Filters from '@/components/Filters';
import ProductGrid from '@/components/ProductGrid';
import { CategoryProvider } from '@/context/CategoryContext';
import { PriceRangeProvider } from '@/context/PriceRangeContext';
import { SearchProvider } from '@/context/SearchContext';
import { SearchParams } from '@/types';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="container px-4 sm:px-6 md:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchProvider initialSearch={params.search}>
          <CategoryProvider initialCategory={params.category}>
            <PriceRangeProvider
              initialPriceRange={{
                min: Number(params.minPrice) || 0,
                max: Number(params.maxPrice) || 500,
              }}
            >
              {/* Sidebar Filters */}
              <Filters />

              {/* Main Content */}
              <div className="flex-1">
                <ActiveFilters />

                <ProductGrid />
              </div>
            </PriceRangeProvider>
          </CategoryProvider>
        </SearchProvider>
      </div>
    </div>
  );
}
