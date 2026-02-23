import { getAllProducts } from "@/lib/products";
import DealsGrid from "./DealsGrid";

export const metadata = {
    title: "โปรโมชั่น — Toytowncafe",
    description: "สินค้าลดราคาพิเศษจาก Toytowncafe",
};

export default async function DealsPage() {
    const allProducts = await getAllProducts();
    const dealProducts = allProducts.filter(
        (p) => p.originalPrice && p.originalPrice > p.price
    );

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                            สินค้าโปรโมชั่น{" "}
                            <span className="text-blue-600">Deals</span>
                        </h1>
                        <div className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg animate-pulse">
                            Hot Now
                        </div>
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        ดีลพิเศษสุดคุ้มสำหรับคุณเท่านั้น •{" "}
                        <span className="text-slate-900">
                            {dealProducts.length} รายการ
                        </span>
                    </p>
                </div>

                {/* Product Grid */}
                {dealProducts.length > 0 ? (
                    <DealsGrid products={dealProducts} />
                ) : (
                    <div className="py-32 text-center">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                            ไม่พบสินค้าโปรโมชั่นในขณะนี้
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
