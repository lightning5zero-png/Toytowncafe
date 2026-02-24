"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";

import CategoryShelf from "@/components/CategoryShelf";
import PromoBannerGrid from "@/components/PromoBannerGrid";

export default function ProductGrid({
    products,
    searchQuery,
    gridTitle,
    hideBento = false,
    audioProducts = [],
    peripheralProducts = []
}: {
    products: Product[],
    searchQuery?: string,
    gridTitle?: string,
    hideBento?: boolean,
    audioProducts?: Product[],
    peripheralProducts?: Product[]
}) {
    const [filters, setFilters] = useState({
        categories: [] as string[],
        brands: [] as string[],
        priceRange: [0, 100000] as [number, number]
    });

    // Filtering Logic
    const filtered = useMemo(() => {
        return products.filter((product) => {
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (!product.name.toLowerCase().includes(query) &&
                    !product.description.toLowerCase().includes(query)) {
                    return false;
                }
            }
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
                return false;
            }
            if (filters.brands.length > 0 && (!product.brand || !filters.brands.includes(product.brand))) {
                return false;
            }
            const priceTHB = product.price * 35;
            if (priceTHB < filters.priceRange[0] || priceTHB > filters.priceRange[1]) {
                return false;
            }
            return true;
        });
    }, [products, searchQuery, filters]);

    const isFiltering = searchQuery || filters.categories.length > 0 || filters.brands.length > 0;

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    // Deal products for the shelf
    const dealProducts = useMemo(() => {
        return products.filter(p => p.originalPrice && p.originalPrice > p.price);
    }, [products]);

    return (
        <section id="discovery" className="bg-white py-12 transition-all duration-500">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Promo Banner Grid — admin-changeable images */}
                {!hideBento && !isFiltering && (
                    <PromoBannerGrid />
                )}

                {/* Product Shelves — Deals + Categories */}
                {!hideBento && !isFiltering && (
                    <div className="mb-20 space-y-2">
                        {dealProducts.length > 0 && (
                            <CategoryShelf title="🔥 สินค้าลดราคา" products={dealProducts} />
                        )}
                        <CategoryShelf title="🎧 Audio & Sound" products={audioProducts} />
                        <CategoryShelf title="🎮 Gaming Peripherals" products={peripheralProducts} />
                    </div>
                )}

                {/* Main Collection Grid with Sidebar */}
                <div id="full-collection" className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar */}
                    <FilterSidebar
                        products={products}
                        onFilterChange={handleFilterChange}
                        className="flex-none"
                    />

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-8">
                            <div>
                                {searchQuery ? (
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
                                        Results for &quot;<span className="text-blue-600">{searchQuery}</span>&quot;
                                    </h2>
                                ) : (
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
                                        {gridTitle || "สินค้าทั้งหมด"}
                                    </h2>
                                )}
                                <p className="text-xs text-slate-400 font-medium">Showing {filtered.length} products</p>
                            </div>
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] hidden md:block">Est. 2026 Collection</p>
                        </div>

                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-x-5 sm:gap-y-10">
                                {filtered.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold uppercase  mb-2">No products found</p>
                                <p className="text-xs text-slate-300">Try adjusting your filters</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
