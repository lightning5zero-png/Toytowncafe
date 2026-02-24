"use client";

import { useRef } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface CategoryShelfProps {
    title: string;
    products: Product[];
    categorySlug?: string;
}

export default function CategoryShelf({ title, products, categorySlug }: CategoryShelfProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-12 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
                    <div className="flex items-center gap-4">
                        <Link
                            href={categorySlug ? `/products?category=${categorySlug}` : "/products"}
                            className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[11px] font-bold uppercase  hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-100"
                        >
                            ดูทั้งหมด
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>

                        {/* Navigation Arrows */}
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Scroll Area */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-8 scroll-smooth no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="flex-none w-[280px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
