"use client";

import { useState, useEffect } from "react";

const HERO_SLIDES = [
    { id: 1, image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=2000" },
    { id: 2, image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=2000" },
    { id: 3, image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=2000" },
    { id: 4, image: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=2000" },
    { id: 5, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=2000" },
    { id: 6, image: "https://images.unsplash.com/photo-1560169123-013009650085?w=2000" },
    { id: 7, image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=2000" },
    { id: 8, image: "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?w=2000" },
];

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return;
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) nextSlide();
        if (touchStart - touchEnd < -50) prevSlide();
        setTouchStart(null);
    };

    return (
        <section
            className="relative h-[45vh] sm:h-[60vh] md:h-[85vh] lg:h-screen w-full overflow-hidden bg-slate-900 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Slides */}
            {HERO_SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                        }`}
                >
                    <img
                        src={slide.image}
                        className="w-full h-full object-cover object-center transform-gpu"
                        alt={`Hero Slide ${slide.id}`}
                    />
                </div>
            ))}

            {/* Previous Button - Tall Edge Bar */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-24 md:h-48 w-8 md:w-14 bg-black/20 hover:bg-black/40 backdrop-blur-md border-y border-r border-white/10 rounded-r-3xl flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 group"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Next Button - Tall Edge Bar */}
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-24 md:h-48 w-8 md:w-14 bg-black/20 hover:bg-black/40 backdrop-blur-md border-y border-l border-white/10 rounded-l-3xl flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 group"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Pagination Dots - Center Bottom */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-30 px-6 py-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/5">
                {HERO_SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className="py-1 group"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className={`transition-all duration-500 rounded-full ${index === currentSlide
                            ? "w-8 h-1.5 md:w-12 md:h-2 bg-white"
                            : "w-2 h-1.5 md:w-2 md:h-2 bg-white/20 group-hover:bg-white/50"
                            }`} />
                    </button>
                ))}
            </div>
        </section>
    );
}
