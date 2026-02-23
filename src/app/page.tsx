import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts, searchProducts } from "@/lib/products";
import type { Product } from "@/types/product";

// This is now a Server Component
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.search || "";

  // Data fetching on the server
  const allProducts = await getAllProducts();
  const products = searchQuery
    ? await searchProducts(searchQuery)
    : allProducts;

  // Filter products for categorized shelves
  const audioProducts = allProducts.filter((p: Product) => p.category === "Audio").slice(0, 8);
  const peripheralProducts = allProducts.filter((p: Product) => p.category === "Peripherals").slice(0, 8);

  return (
    <main className="min-h-screen">
      {!searchQuery && <HeroBanner />}

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid
          products={products}
          searchQuery={searchQuery || undefined}
          audioProducts={audioProducts}
          peripheralProducts={peripheralProducts}
        />
      </Suspense>
    </main>
  );
}

function ProductGridSkeleton() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-lg mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="aspect-square bg-slate-100 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-slate-100 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-slate-100 animate-pulse rounded" />
                <div className="h-5 w-20 bg-slate-100 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
