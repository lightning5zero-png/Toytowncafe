import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";
import { getAllProducts, searchProducts, getProductsByCategory } from "@/lib/products";

// Server Component
export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string; category?: string }>;
}) {
    const params = await searchParams;
    const searchQuery = params.search || "";
    const categoryQuery = params.category || "";

    let products;

    if (searchQuery) {
        products = await searchProducts(searchQuery);
    } else if (categoryQuery) {
        products = await getProductsByCategory(categoryQuery);
    } else {
        products = await getAllProducts();
    }

    return (
        <main className="min-h-screen pt-24">
            <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Products...</div>}>
                <ProductGrid
                    products={products}
                    searchQuery={searchQuery || undefined}
                    hideBento={true}
                />
            </Suspense>
        </main>
    );
}
