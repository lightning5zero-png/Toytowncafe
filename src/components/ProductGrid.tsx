"use client";

import { useState, useMemo, useEffect } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import Link from "next/link";

import CategoryShelf from "@/components/CategoryShelf";

export default function ProductGrid({
    products,
    searchQuery,
    hideBento = false,
    audioProducts = [],
    peripheralProducts = []
}: {
    products: Product[],
    searchQuery?: string,
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
            // 1. Search Query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (!product.name.toLowerCase().includes(query) &&
                    !product.description.toLowerCase().includes(query)) {
                    return false;
                }
            }

            // 2. Categories
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
                return false;
            }

            // 3. Brands
            if (filters.brands.length > 0 && (!product.brand || !filters.brands.includes(product.brand))) {
                return false;
            }

            // 4. Price Range
            const priceTHB = product.price * 35;
            if (priceTHB < filters.priceRange[0] || priceTHB > filters.priceRange[1]) {
                return false;
            }

            return true;
        });
    }, [products, searchQuery, filters]);

    const isFiltering = searchQuery || filters.categories.length > 0 || filters.brands.length > 0;

    const BENTO_SIZE = 7;

    // Filter products with deals (originalPrice > price) and shuffle them for randomization
    const dealProducts = useMemo(() => {
        const filtered = products.filter(p => p.originalPrice && p.originalPrice > p.price);
        // Fisher-Yates shuffle algorithm or simple sort for randomization
        return [...filtered].sort(() => Math.random() - 0.5);
    }, [products]);

    const bentoItems = useMemo(() => {
        return dealProducts.slice(0, BENTO_SIZE);
    }, [dealProducts]);

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    return (
        <section id="discovery" className="bg-white py-12 transition-all duration-500">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Step 1: Bento Showcase - Promotional Deals */}
                {!hideBento && (
                    <div className="mb-20 border-b border-slate-100 pb-20">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-[2px] bg-red-500" />
                                    <span className="text-xs font-black text-red-500 uppercase tracking-[0.3em]">Hot Deals</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                                    สินค้าโปรโมชั่น
                                </h2>
                            </div>
                            <Link href="/deals" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-slate-900 transition-colors flex items-center gap-2 group">
                                ดูดีลทั้งหมด
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>

                        {/* Top Tier: Hero + Side items */}
                        <div className="flex flex-col gap-3">
                            {dealProducts.length === 0 ? (
                                <div className="py-20 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold uppercase tracking-widest">ไม่มีสินค้าโปรโมชั่นในขณะนี้</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col md:flex-row gap-3 md:h-[500px]">
                                        {/* Hero Item */}
                                        {bentoItems[0] && (
                                            <Link href={`/product/${bentoItems[0].slug}`} className="flex-[2] aspect-[4/3] md:aspect-auto group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 shadow-sm">
                                                <img src={bentoItems[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]" key={bentoItems[0].id} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                                                {/* Consistent Discount Badge */}
                                                <div className="absolute top-6 right-6 md:top-10 md:right-10">
                                                    <div className="bg-red-500 text-white px-4 py-2 rounded-2xl font-black text-sm md:text-lg shadow-xl animate-bounce-slow flex flex-col items-center leading-none">
                                                        <span className="text-[10px] md:text-xs uppercase mb-1">SAVE</span>
                                                        <span>{Math.round(((bentoItems[0].originalPrice! - bentoItems[0].price) / bentoItems[0].originalPrice!) * 100)}%</span>
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start pr-6">
                                                    <span className="px-2 py-0.5 bg-red-500 text-[10px] font-black text-white uppercase tracking-widest rounded-full mb-4">Hot Deal</span>
                                                    <h3 className="text-xl md:text-4xl font-black text-white tracking-tighter leading-none mb-4">{bentoItems[0].name}</h3>
                                                    <div className="flex items-end gap-3">
                                                        <span className="text-2xl md:text-5xl font-black text-white">{bentoItems[0].price.toLocaleString()}.-</span>
                                                        <span className="text-sm md:text-xl font-bold text-white/40 line-through mb-1">{bentoItems[0].originalPrice?.toLocaleString()}.-</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}

                                        {/* Side Stack */}
                                        <div className="flex-1 grid grid-cols-2 md:flex md:flex-col gap-3">
                                            {[1, 2].map((idx) => (
                                                bentoItems[idx] && (
                                                    <Link key={bentoItems[idx].id} href={`/product/${bentoItems[idx].slug}`} className="aspect-square md:flex-1 group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-slate-900">
                                                        <img src={bentoItems[idx].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                                                        {/* Consistent Discount Badge */}
                                                        <div className="absolute top-4 right-4 md:top-6 md:right-6">
                                                            <div className="bg-red-500 text-white px-2.5 py-1.5 rounded-xl font-black text-[10px] md:text-xs shadow-lg">
                                                                -{Math.round(((bentoItems[idx].originalPrice! - bentoItems[idx].price) / bentoItems[idx].originalPrice!) * 100)}%
                                                            </div>
                                                        </div>

                                                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                                                            <h3 className="text-[12px] md:text-sm font-black text-white uppercase tracking-tighter leading-tight mb-2 line-clamp-1">{bentoItems[idx].name}</h3>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm md:text-lg font-black text-white">{bentoItems[idx].price.toLocaleString()}.-</span>
                                                                <span className="text-[10px] md:text-xs font-bold text-white/40 line-through">{bentoItems[idx].originalPrice?.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    {/* Second Tier: Grid of 4 Items */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:h-[240px]">
                                        {[3, 4, 5, 6].map((idx) => (
                                            bentoItems[idx] && (
                                                <Link key={bentoItems[idx].id} href={`/product/${bentoItems[idx].slug}`} className="aspect-square md:aspect-auto group relative overflow-hidden rounded-[1.5rem] md:rounded-3xl bg-slate-900">
                                                    <img src={bentoItems[idx].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-60" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                                                    {/* Consistent Discount Badge */}
                                                    <div className="absolute top-4 right-4">
                                                        <div className="bg-red-500 text-white px-2 py-1 rounded-lg font-black text-[9px] md:text-[10px] shadow-lg">
                                                            -{Math.round(((bentoItems[idx].originalPrice! - bentoItems[idx].price) / bentoItems[idx].originalPrice!) * 100)}%
                                                        </div>
                                                    </div>

                                                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                                                        <p className="text-[10px] font-black text-white uppercase tracking-tighter truncate mb-2">{bentoItems[idx].name}</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-black text-white">{bentoItems[idx].price.toLocaleString()}.-</span>
                                                            <span className="text-[10px] font-bold text-white/40 line-through">{bentoItems[idx].originalPrice?.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 1.5: Category Shelves - Only visible when not filtering AND not hiding bento */}
                {!hideBento && !isFiltering && (
                    <div className="mb-20 space-y-4">
                        <div className="bg-slate-50/50 rounded-[3rem] overflow-hidden">
                            <CategoryShelf title="Audio & Sound" products={audioProducts} />
                            <CategoryShelf title="Gaming Peripherals" products={peripheralProducts} />
                        </div>
                    </div>
                )}

                {/* Step 2: Main Collection Grid with Sidebar */}
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
                                        Results for "<span className="text-blue-600">{searchQuery}</span>"
                                    </h2>
                                ) : (
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">สินค้าทั้งหมด</h2>
                                )}
                                <p className="text-xs text-slate-400 font-medium">Showing {filtered.length} products</p>
                            </div>
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] hidden md:block">Est. 2026 Collection</p>
                        </div>

                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-x-5 sm:gap-y-10">
                                {filtered.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold uppercase tracking-widest mb-2">No products found</p>
                                <p className="text-xs text-slate-300">Try adjusting your filters</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
