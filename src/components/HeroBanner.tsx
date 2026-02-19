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

            {/* Navigation Indicators & Buttons */}
            <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-6 z-20 w-full justify-center px-4">
                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all active:scale-90"
                    aria-label="Previous slide"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5 md:gap-3">
                    {HERO_SLIDES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className="py-2 md:py-4 px-0.5 md:px-1 group"
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <div className={`transition-all duration-500 rounded-full ${index === currentSlide
                                ? "w-6 h-1.5 md:w-10 md:h-2 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                : "w-2 h-2 md:w-3 md:h-3 bg-white/20 group-hover:bg-white/50"
                                }`} />
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all active:scale-90"
                    aria-label="Next slide"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
