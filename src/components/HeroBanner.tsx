"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const HERO_SLIDES = [
    {
        id: 1,
        title: "Ethereal Winged",
        subtitle: "Guardian Of The Dawn",
        category: "Masterpiece Series",
        price: "฿12,500",
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=2000",
    },
    {
        id: 2,
        title: "Urban Samurai",
        subtitle: "Sage Edition Art Toy",
        category: "Designer Vinyl",
        price: "฿4,500",
        image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=2000",
    },
    {
        id: 3,
        title: "Celestial Bust",
        subtitle: "Iridescent Glass-Resin",
        category: "Limited Edition",
        price: "฿18,900",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=2000",
    }
];

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-slate-900">
            {/* Background Slides */}
            {HERO_SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
                        }`}
                >
                    {/* Vibrant Image without Heavy White Wash */}
                    <div className="absolute inset-0">
                        <img
                            src={slide.image}
                            className="w-full h-full object-cover object-center saturate-[1.2]"
                            alt={slide.title}
                        />
                        {/* Minimal Dark Gradient for Text Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                        <div className="max-w-3xl pt-10">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="px-3 py-1 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded shadow-xl">
                                    {slide.category}
                                </span>
                                <div className="w-12 h-[1px] bg-white/30" />
                                <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Masterpiece Collection 2026</span>
                            </div>

                            {/* Impact Typography */}
                            <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-black text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
                                {slide.title}<br />
                                <span className="text-white/50 italic text-5xl sm:text-6xl lg:text-7xl">{slide.subtitle}</span>
                            </h1>

                            <div className="flex flex-wrap items-center gap-10 mt-12">
                                <Link
                                    href="#discovery"
                                    className="px-12 py-5 bg-white text-slate-900 font-bold rounded-2xl shadow-2xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 uppercase tracking-widest text-xs"
                                >
                                    เลือกชมสินค้า
                                </Link>

                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">เริ่มต้นที่</span>
                                    <span className="text-4xl font-black text-white drop-shadow-xl">{slide.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Indicators */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className="group py-4 px-2"
                    >
                        <div className={`transition-all duration-500 h-1.5 rounded-full shadow-sm ${index === currentSlide ? "w-20 bg-white" : "w-6 bg-white/20 group-hover:bg-white/40"
                            }`} />
                    </button>
                ))}
            </div>

            {/* Bottom Scroll Hint */}
            <div className="absolute bottom-8 right-12 hidden xl:flex flex-col items-center gap-4 animate-bounce">
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] rotate-90 origin-right translate-x-3 mb-8">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
        </section>
    );
}
