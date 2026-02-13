"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts, searchProducts } from "@/lib/products";

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const allProducts = getAllProducts();
  const products = searchQuery
    ? searchProducts(searchQuery)
    : allProducts;

  return (
    <main className="min-h-screen">
      {!searchQuery && <HeroBanner />}
      <ProductGrid
        products={products}
        searchQuery={searchQuery || undefined}
      />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen">
          <HeroBanner />
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-10 w-64 skeleton rounded-lg mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden">
                    <div className="aspect-square skeleton" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 w-16 skeleton rounded" />
                      <div className="h-4 w-3/4 skeleton rounded" />
                      <div className="h-5 w-20 skeleton rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
