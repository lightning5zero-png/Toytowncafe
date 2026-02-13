"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

interface ProductDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug } = use(params);
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const discount = product.originalPrice
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
        : 0;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const relatedProducts = getAllProducts()
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <main className="min-h-screen pt-24 pb-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav id="breadcrumb" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-10">
                    <Link href="/" className="text-slate-400 hover:text-slate-900 transition-colors">Home</Link>
                    <span className="text-slate-200">/</span>
                    <Link href={`/?category=${product.category}`} className="text-slate-400 hover:text-slate-900 transition-colors">{product.category}</Link>
                    <span className="text-slate-200">/</span>
                    <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Visual Section */}
                    <div className="relative group">
                        <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-white shadow-sm border border-slate-100 flex items-center justify-center p-8">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            {discount > 0 && (
                                <span className="px-3 py-1 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-xl">-{discount}% OFF</span>
                            )}
                            {product.tags.includes("new") && (
                                <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-xl">New Arrival</span>
                            )}
                        </div>
                    </div>

                    {/* Information Section */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">{product.category}</span>
                            <h1 id="product-title" className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.rating} — {product.reviewCount} Reviews</span>
                            </div>
                        </div>

                        <div className="flex items-end gap-4 mb-10">
                            <span className="text-4xl font-black text-slate-900">฿{(product.price * 35).toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-slate-300 line-through font-bold mb-1">฿{(product.originalPrice * 35).toLocaleString()}</span>
                            )}
                        </div>

                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 max-w-xl">{product.longDescription}</p>

                        <div className="mb-10">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Masterpiece Features</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.features.map((f) => (
                                    <span key={f} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] text-slate-600 font-black uppercase tracking-widest shadow-sm">{f}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-10">
                            <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                                {product.inStock ? "Available in Collection" : "Out of Stock"}
                            </span>
                        </div>

                        {product.inStock && (
                            <div className="flex flex-col sm:flex-row items-stretch gap-4">
                                <div className="flex items-center bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-14 h-14 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">－</button>
                                    <span className="w-10 text-center font-black text-slate-900">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="w-14 h-14 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">＋</button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-xl ${addedToCart ? "bg-green-600 text-white" : "bg-slate-900 text-white hover:bg-blue-600 hover:translate-y-[-2px] active:translate-y-0"
                                        }`}
                                >
                                    {addedToCart ? "Added Successfully!" : `Add to Collection — ฿${(product.price * 35 * quantity).toLocaleString()}`}
                                </button>
                            </div>
                        )}

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-slate-100">
                            {[
                                { label: "Free Shipping", desc: "Across Thailand" },
                                { label: "2Y Warranty", desc: "Official Support" },
                                { label: "Easy Return", desc: "30 Days Period" }
                            ].map(b => (
                                <div key={b.label} className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">{b.label}</span>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{b.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">You May Also <span className="text-blue-600">Like</span></h2>
                            <div className="flex-1 h-[1px] bg-slate-100" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <Link key={p.id} href={`/product/${p.slug}`} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="aspect-square p-6 overflow-hidden">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-6 border-t border-slate-100">
                                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-2">{p.category}</span>
                                        <h3 className="text-sm font-black text-slate-900 mb-2 line-clamp-1">{p.name}</h3>
                                        <p className="text-lg font-black text-slate-900">฿{(p.price * 35).toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
