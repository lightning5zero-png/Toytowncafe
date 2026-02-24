"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") || "N/A";
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white pt-28 pb-20">
            <div className="max-w-lg mx-auto px-4 text-center">

                {/* Animated Checkmark */}
                <div className={`transition-all duration-700 ease-out ${showContent ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"}`}>
                    <div className="relative w-28 h-28 mx-auto mb-8">
                        {/* Outer ring pulse */}
                        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-20" />
                        {/* Inner circle */}
                        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                            <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                    style={{
                                        strokeDasharray: 30,
                                        strokeDashoffset: showContent ? 0 : 30,
                                        transition: "stroke-dashoffset 0.8s ease-out 0.3s",
                                    }}
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className={`transition-all duration-700 delay-300 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        สั่งซื้อสำเร็จ! 🎉
                    </h1>
                    <p className="text-slate-700 text-base leading-relaxed mb-8 max-w-sm mx-auto">
                        ขอบคุณสำหรับคำสั่งซื้อ เราจะจัดส่งสินค้าให้คุณโดยเร็วที่สุดครับ
                    </p>
                </div>

                {/* Order Info Card */}
                <div className={`transition-all duration-700 delay-500 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm mb-8">
                        <div className="space-y-5">
                            <div>
                                <p className="text-base font-black uppercase text-slate-600 mb-1">เลขที่คำสั่งซื้อ</p>
                                <p className="text-xl font-black text-slate-900 font-mono ">{orderId}</p>
                            </div>
                            <div className="border-t border-slate-100" />
                            <div className="grid grid-cols-2 gap-4 text-left">
                                <div>
                                    <p className="text-base font-black uppercase text-slate-600 mb-0.5">สถานะ</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                        <span className="text-base font-bold text-amber-600">รอชำระเงิน</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-black uppercase text-slate-600 mb-0.5">จัดส่งภายใน</p>
                                    <span className="text-base font-bold text-slate-900">1-3 วันทำการ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What's Next */}
                <div className={`transition-all duration-700 delay-700 ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <div className="bg-blue-50 rounded-[24px] p-6 mb-10 text-left">
                        <h3 className="text-base font-black text-blue-900 mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            ขั้นตอนถัดไป
                        </h3>
                        <ul className="space-y-2.5">
                            {[
                                "ชำระเงินตามวิธีที่คุณเลือก",
                                "แจ้งสลิป / หลักฐานการชำระเงิน",
                                "ทีมงานจะยืนยันและจัดส่งสินค้าให้คุณ",
                                "ติดตามสถานะออเดอร์ผ่านเว็บไซต์",
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-base font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <span className="text-base text-blue-800">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Actions */}
                <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-[900ms] ease-out ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <Link
                        href="/"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-base font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        ช้อปปิ้งต่อ
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-700 rounded-2xl text-base font-bold border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        กลับหน้าแรก
                    </Link>
                </div>

                {/* Contact Support */}
                <div className={`mt-10 transition-all duration-700 delay-[1100ms] ease-out ${showContent ? "opacity-100" : "opacity-0"}`}>
                    <p className="text-base text-slate-600">
                        มีคำถาม? ติดต่อเราได้ที่{" "}
                        <a href="mailto:support@toytowncafe.com" className="text-blue-600 hover:underline font-bold">
                            support@toytowncafe.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
