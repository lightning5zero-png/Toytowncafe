/**
 * ═══════════════════════════════════════════════════════════
 *  Promo Banner Data — แก้ไขไฟล์นี้เพื่อเปลี่ยนแบนเนอร์โปรโมชั่น
 * ═══════════════════════════════════════════════════════════
 *
 *  📐 ขนาดรูปสำหรับดีไซน์เนอร์:
 *     • Desktop: 1520 x 440 px (Retina 2x)  — ratio ~3.5:1
 *     • Mobile:  960 x 360 px  (Retina 2x)  — ratio ~2.7:1
 *     • Format:  JPG / WebP (คุณภาพ 80-90%)
 *
 *  💡 เคล็ดลับ:
 *     • ข้อความสำคัญควรอยู่ฝั่งขวาของรูป (ฝั่งซ้ายมี gradient ทับ)
 *     • สีเข้มๆ ในรูปจะดูดีกว่า เพราะมี text สีขาวทับอยู่
 *     • ทดสอบทั้งมือถือ (1 คอลัมน์) และ desktop (2 คอลัมน์)
 *
 *  🎨 gradient ที่ใช้ได้:
 *     • "from-blue-900/80 via-blue-900/40 to-transparent"
 *     • "from-slate-900/80 via-slate-900/40 to-transparent"
 *     • "from-red-900/80 via-red-900/40 to-transparent"
 *     • "from-violet-900/80 via-violet-900/40 to-transparent"
 *     • "from-emerald-900/80 via-emerald-900/40 to-transparent"
 * ═══════════════════════════════════════════════════════════
 */

export interface PromoBanner {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    badge?: string;
    link: string;
    gradient: string;
}

const promoBanners: PromoBanner[] = [
    {
        id: "promo-1",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1520&h=440&fit=crop",
        title: "HOT DEALS สุดคุ้ม",
        subtitle: "ลดราคาสูงสุดกว่า 50% เฉพาะสัปดาห์นี้",
        badge: "🔥 Hot",
        link: "/deals",
        gradient: "from-blue-900/80 via-blue-900/40 to-transparent",
    },
    {
        id: "promo-2",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1520&h=440&fit=crop",
        title: "NEW ARRIVALS",
        subtitle: "สินค้ามาใหม่ พร้อมส่ง",
        badge: "✨ New",
        link: "/products",
        gradient: "from-slate-900/80 via-slate-900/40 to-transparent",
    },
    {
        id: "promo-3",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1520&h=440&fit=crop",
        title: "FLASH SALE",
        subtitle: "เฉพาะวันนี้เท่านั้น!",
        badge: "⚡ Flash",
        link: "/deals",
        gradient: "from-red-900/80 via-red-900/40 to-transparent",
    },
    {
        id: "promo-4",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1520&h=440&fit=crop",
        title: "EXCLUSIVE COLLECTION",
        subtitle: "คอลเลคชั่นพิเศษ ลิมิเต็ดเอดิชั่น",
        badge: "💎 Exclusive",
        link: "/products",
        gradient: "from-violet-900/80 via-violet-900/40 to-transparent",
    },
];

export default promoBanners;
