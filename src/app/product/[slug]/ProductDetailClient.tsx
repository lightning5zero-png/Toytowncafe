"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function ProductDetailClient({
    product,
    relatedProducts
}: {
    product: Product;
    relatedProducts: Product[];
}) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    // Fallback images if not provided
    const galleryImages = product.images?.length ? product.images : [product.image, product.image, product.image];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) nextSlide();
        if (touchStart - touchEnd < -50) prevSlide();
        setTouchStart(null);
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };


    return (
        <main className="min-h-screen pt-24 pb-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
                    <Link href="/" className="text-slate-400 hover:text-slate-900 transition-colors">Home</Link>
                    <span className="text-slate-200">/</span>
                    <Link href="/products" className="text-slate-400 hover:text-slate-900 transition-colors">Products</Link>
                    <span className="text-slate-200">/</span>
                    <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Visual Section - Gallery */}
                    <div className="relative group">
                        <div
                            className="aspect-square rounded-[2.5rem] overflow-hidden bg-white shadow-sm border border-slate-100 flex items-center justify-center relative touch-pan-y"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* Images */}
                            <div className="absolute inset-0 flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                {galleryImages.map((img, idx) => (
                                    <div key={idx} className="flex-none w-full h-full flex items-center justify-center relative">
                                        <Image
                                            src={img}
                                            alt={`${product.name} ${idx + 1}`}
                                            fill
                                            priority={idx === 0}
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Discount Badge */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                                {discount > 0 && (
                                    <span className="px-3 py-1 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-xl">-{discount}% OFF</span>
                                )}
                                {product.tags.includes("new") && (
                                    <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-xl">New Arrival</span>
                                )}
                            </div>

                            {/* Navigation Arrows (Hidden on mobile, visible on LG hover) */}
                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:flex">
                                <button
                                    onClick={prevSlide}
                                    className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all pointer-events-auto"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all pointer-events-auto"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                                {galleryImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`transition-all duration-300 rounded-full ${idx === currentSlide ? "w-8 h-1.5 bg-slate-900" : "w-1.5 h-1.5 bg-slate-200 hover:bg-slate-300"
                                            }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Thumbnails (Desktop only) */}
                        <div className="hidden lg:flex gap-4 mt-8 px-2 py-4 overflow-x-auto no-scrollbar">
                            {galleryImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-24 h-24 rounded-2xl overflow-hidden transition-all flex-none relative bg-white ${idx === currentSlide
                                        ? "ring-2 ring-blue-600 scale-110 shadow-xl z-10"
                                        : "opacity-50 hover:opacity-100 hover:scale-105"
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        sizes="100px"
                                        className="object-cover"
                                    />
                                    {/* Selected Indicator Dot */}
                                    {idx === currentSlide && (
                                        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full shadow-lg z-20" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Information Section */}
                    <div className="flex flex-col">
                        <header className="mb-8">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4 block">{product.category}</span>
                            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.rating} — {product.reviewCount} Reviews</span>
                            </div>
                        </header>

                        <div className="flex items-end gap-4 mb-10">
                            <span className="text-4xl font-black text-slate-900">฿{(product.price * 35).toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-slate-300 line-through font-bold mb-1">฿{(product.originalPrice * 35).toLocaleString()}</span>
                            )}
                        </div>

                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 max-w-xl">{product.longDescription}</p>

                        <section className="mb-10">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Masterpiece Features</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.features.map((f) => (
                                    <span key={f} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] text-slate-600 font-black uppercase tracking-widest shadow-sm">{f}</span>
                                ))}
                            </div>
                        </section>

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
                    <section className="mt-32">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">You May Also <span className="text-blue-600">Like</span></h2>
                            <div className="flex-1 h-[1px] bg-slate-100" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <Link key={p.id} href={`/p/${p.slug}`} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="aspect-square relative overflow-hidden bg-[#F8FAFC]">
                                        {/* Primary Image */}
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 25vw"
                                            className="object-cover transition-all duration-[1200ms] group-hover:scale-110 group-hover:opacity-0"
                                        />

                                        {/* Secondary Image (Hover Swap) */}
                                        <Image
                                            src={(p.images && p.images.length > 1) ? p.images[1] : p.image}
                                            alt={`${p.name} alternate`}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 25vw"
                                            className="object-cover opacity-0 scale-125 transition-all duration-[1200ms] group-hover:opacity-100 group-hover:scale-100"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                    <div className="p-6 border-t border-slate-100">
                                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-1">{p.category}</span>
                                        <h3 className="text-sm font-black text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                                        <p className="text-lg font-black text-slate-900">฿{(p.price * 35).toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
