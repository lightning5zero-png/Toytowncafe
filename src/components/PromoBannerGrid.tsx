"use client";

import Image from "next/image";
import Link from "next/link";
import promoBanners from "@/data/promoBanners";

/**
 * PromoBannerGrid
 *
 * ขนาดแบนเนอร์สำหรับดีไซน์เนอร์:
 * ─────────────────────────────────────────
 *  Desktop (2 คอลัมน์):
 *    • ขนาดแนะนำ: 760 x 220 px  (ratio ~3.5:1)
 *    • ขนาด Retina (2x): 1520 x 440 px
 *
 *  Mobile (1 คอลัมน์):
 *    • ขนาดแนะนำ: 480 x 180 px  (ratio ~2.7:1)
 *    • ขนาด Retina (2x): 960 x 360 px
 *
 *  Format: JPG หรือ WebP (คุณภาพ 80-90%)
 *  ข้อความสำคัญควรอยู่ฝั่งขวาของรูป (ฝั่งซ้ายจะมี gradient ทับ)
 * ─────────────────────────────────────────
 */
export default function PromoBannerGrid() {
    return (
        <div className="mb-16 border-b border-slate-100 pb-16">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-red-500" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">
                    Promotions
                </span>
            </div>

            {/* Banner Grid: 2x2 compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {promoBanners.map((banner) => (
                    <Link
                        key={banner.id}
                        href={banner.link}
                        className="group relative overflow-hidden rounded-2xl aspect-[2.5/1] sm:aspect-[3/1] lg:aspect-[3.5/1]"
                    >
                        {/* Background Image */}
                        <Image
                            src={banner.image}
                            alt={banner.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`}
                        />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6 z-10">
                            {/* Badge */}
                            {banner.badge && (
                                <span className="self-start px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest rounded-full mb-2 border border-white/10">
                                    {banner.badge}
                                </span>
                            )}

                            {/* Title */}
                            <h3 className="text-lg lg:text-2xl font-black text-white tracking-tight leading-tight mb-1">
                                {banner.title}
                            </h3>

                            {/* Subtitle */}
                            <p className="text-white/50 text-[10px] lg:text-xs font-medium">
                                {banner.subtitle}
                            </p>
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/10">
                            <span className="text-white text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
