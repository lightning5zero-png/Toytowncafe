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

    // Use a stable set of bento items (the first 6 from the original list if possible)
    const bentoItems = useMemo(() => products.slice(0, 6), [products]);

    return (
        <section id="discovery" className={`bg-white transition-all duration-500 ${searchQuery ? "pt-32 pb-20" : "py-12"}`}>
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Step 1: Bento Showcase - ONLY show when NOT searching */}
                {!searchQuery && bentoItems.length >= 4 && (
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em]">Feature Gallery</h2>
                                <div className="w-12 h-[1px] bg-slate-200" />
                            </div>
                            <Link href="#full-collection" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                                Scroll to Archive ↓
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[750px]">
                            {/* 1. The Hero Piece (Main Focus) */}
                            {bentoItems[0] && (
                                <Link
                                    href={`/product/${bentoItems[0].slug}`}
                                    className="md:col-span-12 lg:col-span-7 group relative overflow-hidden rounded-[2rem] bg-slate-50 transition-all duration-500 shadow-sm"
                                >
                                    <img src={bentoItems[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                    <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                                        <div>
                                            <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded mb-3 inline-block">Top Pick</span>
                                            <h3 className="text-4xl font-black text-white leading-tight tracking-tighter">{bentoItems[0].name}</h3>
                                        </div>
                                        <span className="text-2xl font-black text-white/90">฿{(bentoItems[0].price * 35).toLocaleString()}</span>
                                    </div>
                                </Link>
                            )}

                            {/* 2. Side Stack (Interesting layout) */}
                            <div className="md:col-span-12 lg:col-span-5 grid grid-cols-2 grid-rows-2 gap-4 h-full">
                                {/* Tall Item */}
                                {bentoItems[1] && (
                                    <Link
                                        href={`/product/${bentoItems[1].slug}`}
                                        className="col-span-1 row-span-2 group relative overflow-hidden rounded-[2rem] bg-slate-100"
                                    >
                                        <img src={bentoItems[1].image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest">{bentoItems[1].name}</h3>
                                        </div>
                                    </Link>
                                )}

                                {/* Wide Item */}
                                {bentoItems[2] && (
                                    <Link
                                        href={`/product/${bentoItems[2].slug}`}
                                        className="col-span-1 row-span-1 group relative overflow-hidden rounded-[2rem] bg-slate-50"
                                    >
                                        <img src={bentoItems[2].image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
                                        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center text-white text-[10px]">↗</div>
                                    </Link>
                                )}

                                {/* Small Accent Item */}
                                {bentoItems[3] && (
                                    <Link
                                        href={`/product/${bentoItems[3].slug}`}
                                        className="col-span-1 row-span-1 group relative overflow-hidden rounded-[2rem] bg-blue-600 flex items-center justify-center p-6"
                                    >
                                        <img src={bentoItems[3].image} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity" />
                                        <h3 className="relative text-white text-xs font-black uppercase tracking-[0.3em] text-center">{bentoItems[3].name}</h3>
                                    </Link>
                                )}
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
