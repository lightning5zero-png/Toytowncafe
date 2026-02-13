"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function ProductGrid({ products, searchQuery }: { products: Product[], searchQuery?: string }) {
    const [activeCategory, setActiveCategory] = useState<string>("ทั้งหมด");

    const categories = useMemo(() => ["ทั้งหมด", "Statues", "Designer Toys", "Model Kits", "Minimalist"], []);

    const filtered = useMemo(() => {
        const categoryQuery = activeCategory === "ทั้งหมด" ? "All" : activeCategory;
        return activeCategory === "ทั้งหมด"
            ? products
            : products.filter((p) => p.category === categoryQuery);
    }, [products, activeCategory]);

    // Simplified Bento Gallery to 7 premium items
    const bentoItems = useMemo(() => products.slice(0, 7), [products]);

    return (
        <section id="discovery" className={`bg-white transition-all duration-500 ${searchQuery ? "pt-32 pb-20" : "py-12"}`}>
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Step 1: Bento Showcase - Simplified 7-Item Layout */}
                {!searchQuery && bentoItems.length >= 7 && (
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Curated Boutique</h2>
                                <div className="w-8 h-[1px] bg-slate-200" />
                            </div>
                            <Link href="#full-collection" className="text-[9px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors">
                                Archive ↓
                            </Link>
                        </div>

                        {/* Top Tier: Hero + Side items */}
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row gap-3 md:h-[500px]">
                                {/* Hero Item */}
                                <Link href={`/product/${bentoItems[0].slug}`} className="flex-[2] aspect-[4/3] md:aspect-auto group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 shadow-sm border border-slate-100">
                                    <img src={bentoItems[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start pr-6">
                                        <span className="px-1.5 py-0.5 bg-blue-600 text-[8px] font-black text-white uppercase tracking-widest rounded mb-3">Exclusive</span>
                                        <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter leading-none">{bentoItems[0].name}</h3>
                                    </div>
                                </Link>

                                {/* Side Stack */}
                                <div className="flex-1 grid grid-cols-2 md:flex md:flex-col gap-3">
                                    <Link href={`/product/${bentoItems[1].slug}`} className="aspect-square md:flex-1 group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-slate-900 border border-white/5">
                                        <img src={bentoItems[1].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all" />
                                        <div className="absolute inset-x-0 bottom-0 p-5">
                                            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-tighter block truncate">{bentoItems[1].name}</span>
                                        </div>
                                    </Link>
                                    <Link href={`/product/${bentoItems[2].slug}`} className="aspect-square md:flex-1 group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-slate-900">
                                        <img src={bentoItems[2].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-all flex flex-col items-center justify-center p-6 text-center">
                                            <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">Designer</span>
                                            <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest leading-tight line-clamp-2">{bentoItems[2].name}</h3>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Second Tier: Expanded Grid of 4 Items */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:h-[240px]">
                                {[3, 4, 5, 6].map((idx) => (
                                    <Link key={idx} href={`/product/${bentoItems[idx].slug}`} className="aspect-square md:aspect-auto group relative overflow-hidden rounded-[1.5rem] md:rounded-3xl bg-slate-900 border border-white/5">
                                        <img src={bentoItems[idx].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/30 transition-all" />
                                        <div className="relative h-full flex flex-col justify-end p-6 md:p-8 z-10">
                                            <p className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-tighter truncate mb-1">{bentoItems[idx].name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-4 h-[1px] bg-blue-600" />
                                                <p className="text-[7px] md:text-[8px] font-bold text-blue-400 uppercase tracking-widest">Discover</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Main Collection Grid */}
                <div id="full-collection" className={!searchQuery ? "pt-12 border-t border-slate-100" : ""}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                        <div>
                            {searchQuery ? (
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
                                    Results for "<span className="text-blue-600">{searchQuery}</span>"
                                </h2>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">The Archive.</h2>
                                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mt-4">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat
                                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                                                    : "bg-slate-50 text-slate-400 border-transparent hover:border-slate-200"
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        {!searchQuery && <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] hidden md:block">Est. 2026 Collection</p>}
                    </div>

                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                            {filtered.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-slate-400 font-bold uppercase tracking-widest">ไม่พบสินค้าที่คุณค้นหา</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
