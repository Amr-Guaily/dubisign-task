import { type NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Get filter parameters from URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 500;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return NextResponse.json({
    products: filteredProducts,
    total: 5,
    success: true,
  });
}
