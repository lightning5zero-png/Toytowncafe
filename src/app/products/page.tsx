"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts, searchProducts } from "@/lib/products";

function ProductsContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const allProducts = getAllProducts();
    const products = searchQuery
        ? searchProducts(searchQuery)
        : allProducts;

    return (
        <main className="min-h-screen pt-24">
            <ProductGrid
                products={products}
                searchQuery={searchQuery || undefined}
                hideBento={true}
            // Bento and Category shelves are hidden by default in search mode or when we don't pass them
            // But let's ensure ProductGrid handles the "only grid" view nicely.
            />
        </main>
    );
}

export default function ProductsPage() {
    return (
        <Suspense backdrop-blur-xl>
            <ProductsContent />
        </Suspense>
    );
}
