"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartPanel from "@/components/CartPanel";

export default function Navbar() {
    const { totalItems, toggleCart, isCartOpen } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-xl py-3 shadow-2xl border-b border-slate-100"
                    : "bg-gradient-to-b from-black/60 to-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-4 group">
                            {/* Modern Minimalist Icon */}
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${isScrolled
                                ? "bg-slate-900 border-slate-900 shadow-lg"
                                : "bg-white/10 border-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:bg-white group-hover:border-white"
                                }`}>
                                <span className={`text-xl font-light tracking-tighter transition-all duration-500 ${isScrolled ? "text-white" : "text-white group-hover:text-slate-900"
                                    }`}>T</span>
                            </div>

                            {/* High-End Stacked Typographic Logo */}
                            <div className="flex flex-col leading-none items-end">
                                <span className={`text-2xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'
                                    }`}>
                                    Toytown
                                </span>
                                <span className={`text-[9px] font-black uppercase tracking-[0.45em] transition-colors -mt-0.5 ${isScrolled ? 'text-blue-600' : 'text-blue-400'
                                    }`}>
                                    cafe
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-12">
                            {["หน้าแรก", "สินค้า", "ดีลพิเศษ", "แกลเลอรี"].map((item) => (
                                <Link
                                    key={item}
                                    href="/"
                                    className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 ${isScrolled
                                        ? "text-slate-500 hover:text-slate-900"
                                        : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-6">
                            <form onSubmit={handleSearch} className="hidden sm:block relative group">
                                <input
                                    type="text"
                                    placeholder="ค้นหาสินค้า..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`pl-5 pr-10 py-2.5 rounded-xl text-[11px] font-bold transition-all outline-none w-40 focus:w-64 border ${isScrolled
                                        ? "bg-slate-100 border-transparent focus:bg-white focus:border-slate-200"
                                        : "bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/20"
                                        }`}
                                />
                                <button type="submit" className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isScrolled ? "text-slate-400" : "text-white/40"
                                    }`}>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>

                            <button
                                onClick={toggleCart}
                                className={`relative px-5 py-2.5 rounded-xl flex items-center gap-3 transition-all active:scale-95 font-black text-[11px] uppercase tracking-widest shadow-xl ${isScrolled
                                    ? "bg-slate-900 text-white hover:bg-slate-800"
                                    : "bg-white text-slate-900 hover:bg-slate-100"
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="hidden sm:inline">ตะกร้า</span>
                                {totalItems > 0 && (
                                    <span className={`absolute -top-2 -right-2 w-5 h-5 text-[10px] font-black rounded-full flex items-center justify-center ring-2 animate-bounce-slow shadow-lg ${isScrolled ? "bg-blue-600 text-white ring-white" : "bg-slate-900 text-white ring-white"
                                        }`}>
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <CartPanel isOpen={isCartOpen} onClose={toggleCart} />
        </>
    );
}
