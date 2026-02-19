"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts, searchProducts } from "@/lib/products";

function ProductsContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "";
    const allProducts = getAllProducts();

    let products = allProducts;

    if (searchQuery) {
        products = searchProducts(searchQuery);
    } else if (categoryQuery) {
        products = allProducts.filter(p => p.category.toLowerCase() === categoryQuery.toLowerCase());
    }

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
