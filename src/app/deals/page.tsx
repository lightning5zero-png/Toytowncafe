"use client";

import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";

export default function DealsPage() {
    // For demonstration, let's filter products with an "originalPrice" (indicating a discount)
    const allProducts = getAllProducts();
    const dealProducts = allProducts.filter(p => p.originalPrice && p.originalPrice > p.price);

    return (
        <main className="min-h-screen pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">
                    สินค้าโปรโมชั่น <span className="text-blue-600">Deals</span>
                </h1>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                    ดีลพิเศษสุดคุ้มสำหรับคุณเท่านั้น
                </p>
            </div>

            <ProductGrid
                products={dealProducts}
                hideBento={true}
            />
        </main>
    );
}
