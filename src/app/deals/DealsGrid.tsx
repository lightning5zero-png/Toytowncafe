"use client";

import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

export default function DealsGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-x-5 sm:gap-y-10">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
