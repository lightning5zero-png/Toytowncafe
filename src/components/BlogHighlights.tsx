"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ALL_ARTICLES = [
    {
        id: 1,
        title: "วิธีเลือกซื้อหูฟังให้เหมาะกับไลฟ์สไตล์ของคุณในปี 2026",
        excerpt: "การเลือกซื้อหูฟังไม่ได้มีเพียงแค่เรื่องของคุณภาพเสียงเท่านั้น แต่ยังรวมถึงความสะดวกสบาย...",
        category: "รีวิวสินค้า",
        author: "Admin Toytown",
        date: "19 ก.พ. 2026",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    },
    {
        id: 2,
        title: "5 อุปกรณ์ Work from Home ที่จะช่วยลดอาการปวดหลัง",
        excerpt: "ปรับเปลี่ยนโต๊ะทำงานของคุณให้กลายเป็นสวรรค์ของการทำงานด้วยอุปกรณ์เสริมเหล่านี้...",
        category: "ไลฟ์สไตล์",
        author: "Editor Joy",
        date: "18 ก.พ. 2026",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80"
    },
    {
        id: 3,
        title: "จัดสเปคคอมสายคลีน ขาวสบายตาทั้งโต๊ะ",
        excerpt: "พาชมไอเดียการจัดโต๊ะคอมโทนสีขาว Minimal พร้อมอุปกรณ์ต่อพ่วงที่น่าสนใจ...",
        category: "จัดโต๊ะคอม",
        author: "Admin Toytown",
        date: "15 ก.พ. 2026",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80"
    },
    {
        id: 4,
        title: "ทำไมคีย์บอร์ด Mechanical ถึงเป็นที่นิยม?",
        excerpt: "เจาะลึกเสน่ห์ของปุ่มกดที่ทำให้ใครหลายคนหลงรัก จนต้องมีไว้ครอบครอง...",
        category: "สาระความรู้",
        author: "Key Master",
        date: "10 ก.พ. 2026",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80"
    },
    {
        id: 5,
        title: "เทรนด์หน้าจอโค้ง Ultra-wide ในปี 2026",
        excerpt: "คุ้มค่าไหมกับการอัปเกรดมาใช้หน้าจอแบบกว้างพิเศษเพื่อการทำงานและเล่นเกม...",
        category: "เทคโนโลยี",
        author: "Admin Toytown",
        date: "05 ก.พ. 2026",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
    }
];

export default function BlogHighlights() {
    const [randomArticles, setRandomArticles] = useState<typeof ALL_ARTICLES>([]);

    useEffect(() => {
        // Shuffle and pick 3
        const shuffled = [...ALL_ARTICLES].sort(() => 0.5 - Math.random());
        setRandomArticles(shuffled.slice(0, 3));
    }, []);

    if (randomArticles.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">
                            บทความที่น่าสนใจ <span className="text-blue-600">Blog</span>
                        </h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                            อัปเดตเทรนด์ รีวิว และสาระความรู้จากพวกเรา
                        </p>
                    </div>
                    <Link
                        href="/articles"
                        className="text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 flex items-center gap-2 group"
                    >
                        อ่านบทความทั้งหมด
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {randomArticles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/articles`}
                            className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                        >
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                        {article.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-400">
                                        {article.author.charAt(0)}
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[11px] font-black text-slate-900">{article.author}</span>
                                        <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{article.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
