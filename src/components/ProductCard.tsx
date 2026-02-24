"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, toggleCart } = useCart();

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <article className="group h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            {/* Product Image Container: Full Frame with Image Swap on Hover */}
            <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden rounded-t-2xl bg-[#F8FAFC]">
                {/* Primary Image (Full Frame) */}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-all duration-[1200ms] group-hover:scale-110 group-hover:opacity-0"
                />

                {/* Secondary Image (Visible on Hover) - Uses second image from array or primary as fallback */}
                <Image
                    src={(product.images && product.images.length > 1) ? product.images[1] : product.image}
                    alt={`${product.name} alternate`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-0 scale-125 transition-all duration-[1200ms] group-hover:opacity-100 group-hover:scale-100"
                />

                {/* Subtle Bottom Overlay for better text readability and "Depth" */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 z-30 bg-red-500 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-lg shadow-lg shadow-red-500/20">
                        -{discount}%
                    </div>
                )}

                {/* Status Badge */}
                {product.tags.includes("limited") && (
                    <div className="absolute top-3 right-3 z-30 bg-slate-900/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-black uppercase  px-2.5 py-1 rounded-lg shadow-lg">
                        Rare
                    </div>
                )}
            </Link>

            {/* Product Content */}
            <div className="p-2 sm:p-4 flex-1 flex flex-col">
                <span className="text-[9px] sm:text-[11px] font-medium text-slate-400 truncate">
                    {product.category}
                </span>

                <Link href={`/product/${product.slug}`}>
                    <h3 className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm font-semibold text-slate-800 line-clamp-2 min-h-[30px] sm:min-h-[40px] group-hover:text-blue-600 transition-colors leading-tight">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto pt-2 sm:pt-4">
                    <div className="flex flex-col mb-2 sm:mb-4">
                        <span className="text-sm sm:text-xl font-bold text-slate-900 leading-none">
                            ฿{(product.price * 35).toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="text-[8px] sm:text-xs text-slate-300 line-through mt-0.5 sm:mt-1">
                                ฿{(product.originalPrice * 35).toLocaleString()}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-1 sm:gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                            }}
                            className="flex-1 py-1 sm:py-2.5 bg-slate-50 text-slate-600 border border-slate-100 text-[8px] sm:text-sm font-bold uppercase  rounded-lg sm:rounded-xl hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="hidden sm:inline">ใส่ตะกร้า</span>
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                                toggleCart();
                            }}
                            className="flex-1 py-1 sm:py-2.5 bg-slate-900 text-white text-[8px] sm:text-sm font-bold uppercase  rounded-lg sm:rounded-xl hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-slate-900/10"
                        >
                            <span className="hidden sm:inline">ซื้อเลย</span>
                            <span className="sm:hidden">ซื้อ</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
