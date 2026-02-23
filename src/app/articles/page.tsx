export default function ArticlesPage() {
    return (
        <main className="min-h-screen pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                        บทความ <span className="text-blue-600">& Blog</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-sm">
                        ข่าวสารและรีวิวสินค้าที่น่าสนใจ
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Placeholder Articles */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[16/10] bg-slate-100 rounded-[32px] mb-6 overflow-hidden relative border border-slate-50">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-slate-400 font-black uppercase tracking-widest text-xs">ภาพประกอบบทความ</span>
                                </div>
                            </div>
                            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                รีวิวสินค้า
                            </span>
                            <h2 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                                วิธีเลือกซื้อหูฟังให้เหมาะกับไลฟ์สไตล์ของคุณในปี 2026
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                การเลือกซื้อหูฟังไม่ได้มีเพียงแค่เรื่องของคุณภาพเสียงเท่านั้น แต่ยังรวมถึงความสะดวกสบายในการสวมใส่...
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100" />
                                <div className="flex flex-col leading-none">
                                    <span className="text-[11px] font-black text-slate-900">Admin Toytown</span>
                                    <span className="text-[10px] font-bold text-slate-400 mt-0.5">19 กุมภาพันธ์ 2026</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
