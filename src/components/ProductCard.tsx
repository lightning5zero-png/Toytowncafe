"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Product Image */}
            <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden rounded-t-2xl bg-slate-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />

                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                        ลด {discount}%
                    </div>
                )}

                {/* Status Badge */}
                {product.tags.includes("limited") && (
                    <div className="absolute top-3 right-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                        หายาก
                    </div>
                )}
            </Link>

            {/* Product Content */}
            <div className="p-4">
                <span className="text-[11px] font-medium text-slate-400">
                    {product.category}
                </span>

                <Link href={`/product/${product.slug}`}>
                    <h3 className="mt-1 text-sm font-semibold text-slate-800 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-900">
                            ฿{(product.price * 35).toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-slate-300 line-through">
                                ฿{(product.originalPrice * 35).toLocaleString()}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        ใส่ตะกร้า
                    </button>
                </div>
            </div>
        </div>
    );
}
