"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ShippingForm {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    district: string;
    province: string;
    postalCode: string;
    note: string;
}

type PaymentMethod = "cod" | "bank_transfer" | "promptpay";

export default function CheckoutPage() {
    const { items, totalItems, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("promptpay");

    const [form, setForm] = useState<ShippingForm>({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        district: "",
        province: "",
        postalCode: "",
        note: "",
    });

    const [errors, setErrors] = useState<Partial<ShippingForm>>({});

    const updateField = (field: keyof ShippingForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validateShipping = (): boolean => {
        const newErrors: Partial<ShippingForm> = {};
        if (!form.fullName.trim()) newErrors.fullName = "กรุณากรอกชื่อ-นามสกุล";
        if (!form.phone.trim()) newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
        else if (!/^0\d{8,9}$/.test(form.phone.trim())) newErrors.phone = "เบอร์โทรไม่ถูกต้อง";
        if (!form.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = "อีเมลไม่ถูกต้อง";
        if (!form.address.trim()) newErrors.address = "กรุณากรอกที่อยู่";
        if (!form.district.trim()) newErrors.district = "กรุณากรอกเขต/อำเภอ";
        if (!form.province.trim()) newErrors.province = "กรุณากรอกจังหวัด";
        if (!form.postalCode.trim()) newErrors.postalCode = "กรุณากรอกรหัสไปรษณีย์";
        else if (!/^\d{5}$/.test(form.postalCode.trim())) newErrors.postalCode = "รหัสไปรษณีย์ต้องเป็น 5 หลัก";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (currentStep === 1 && validateShipping()) {
            setCurrentStep(2);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePlaceOrder = async () => {
        setIsSubmitting(true);
        try {
            const checkoutData = {
                items: items.map((item) => ({
                    id: item.product.id,
                    quantity: item.quantity,
                })),
                shipping: form,
                paymentMethod,
            };

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(checkoutData),
            });

            const result = await response.json();

            if (result.success) {
                clearCart();
                router.push(`/checkout/success?orderId=${result.orderId || "TTC-" + Date.now()}`);
            } else {
                alert("เกิดข้อผิดพลาด: " + (result.error || "กรุณาลองใหม่อีกครั้ง"));
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่");
        } finally {
            setIsSubmitting(false);
        }
    };

    const shippingCost = totalPrice * 35 >= 1500 ? 0 : 60;
    const grandTotal = totalPrice * 35 + shippingCost;

    // Empty cart guard
    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20">
                <div className="max-w-lg mx-auto px-4 text-center">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-[32px] bg-slate-50 flex items-center justify-center">
                        <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">ตะกร้าของคุณว่างเปล่า</h1>
                    <p className="text-slate-600 text-base mb-8">เพิ่มสินค้าลงตะกร้าก่อนทำการสั่งซื้อ</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-base font-bold hover:bg-slate-800 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        กลับไปช้อปปิ้ง
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pt-28 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-base text-slate-600 hover:text-slate-600 transition-colors mb-4 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        กลับไปช้อปปิ้งต่อ
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Checkout</h1>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center gap-0 mb-12 max-w-md">
                    {[
                        { num: 1, label: "ข้อมูลจัดส่ง" },
                        { num: 2, label: "ชำระเงิน" },
                    ].map((step, i) => (
                        <div key={step.num} className="flex items-center flex-1">
                            <button
                                onClick={() => {
                                    if (step.num < currentStep) setCurrentStep(step.num);
                                }}
                                className={`flex items-center gap-3 ${step.num <= currentStep ? "cursor-pointer" : "cursor-default"}`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300 ${step.num < currentStep
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                        : step.num === currentStep
                                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                            : "bg-slate-100 text-slate-600"
                                        }`}
                                >
                                    {step.num < currentStep ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                    ) : (
                                        step.num
                                    )}
                                </div>
                                <span className={`text-base font-bold hidden sm:block ${step.num <= currentStep ? "text-slate-900" : "text-slate-600"}`}>
                                    {step.label}
                                </span>
                            </button>
                            {i < 1 && (
                                <div className={`flex-1 h-0.5 mx-4 rounded-full transition-colors duration-300 ${currentStep > 1 ? "bg-emerald-500" : "bg-slate-200"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    {/* Left: Form */}
                    <div className="lg:col-span-3">
                        {currentStep === 1 ? (
                            /* ─── Step 1: Shipping ─── */
                            <div className="bg-white rounded-[32px] border border-slate-100 p-6 sm:p-10 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-slate-900">ข้อมูลจัดส่ง</h2>
                                        <p className="text-base text-slate-600 font-medium">กรอกที่อยู่สำหรับจัดส่งสินค้า</p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {/* Name */}
                                    <InputField
                                        id="checkout-fullname"
                                        label="ชื่อ - นามสกุล"
                                        value={form.fullName}
                                        onChange={(v) => updateField("fullName", v)}
                                        error={errors.fullName}
                                        placeholder="เช่น สมชาย ใจดี"
                                    />

                                    {/* Phone + Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <InputField
                                            id="checkout-phone"
                                            label="เบอร์โทรศัพท์"
                                            value={form.phone}
                                            onChange={(v) => updateField("phone", v)}
                                            error={errors.phone}
                                            placeholder="08X-XXX-XXXX"
                                            type="tel"
                                        />
                                        <InputField
                                            id="checkout-email"
                                            label="อีเมล"
                                            value={form.email}
                                            onChange={(v) => updateField("email", v)}
                                            error={errors.email}
                                            placeholder="example@email.com"
                                            type="email"
                                        />
                                    </div>

                                    {/* Address */}
                                    <InputField
                                        id="checkout-address"
                                        label="ที่อยู่"
                                        value={form.address}
                                        onChange={(v) => updateField("address", v)}
                                        error={errors.address}
                                        placeholder="บ้านเลขที่ ซอย ถนน"
                                        multiline
                                    />

                                    {/* District + Province */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <InputField
                                            id="checkout-district"
                                            label="เขต / อำเภอ"
                                            value={form.district}
                                            onChange={(v) => updateField("district", v)}
                                            error={errors.district}
                                            placeholder="เช่น บางรัก"
                                        />
                                        <InputField
                                            id="checkout-province"
                                            label="จังหวัด"
                                            value={form.province}
                                            onChange={(v) => updateField("province", v)}
                                            error={errors.province}
                                            placeholder="เช่น กรุงเทพฯ"
                                        />
                                    </div>

                                    {/* Postal + Note */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <InputField
                                            id="checkout-postalcode"
                                            label="รหัสไปรษณีย์"
                                            value={form.postalCode}
                                            onChange={(v) => updateField("postalCode", v)}
                                            error={errors.postalCode}
                                            placeholder="10XXX"
                                        />
                                        <InputField
                                            id="checkout-note"
                                            label="หมายเหตุ (ถ้ามี)"
                                            value={form.note}
                                            onChange={(v) => updateField("note", v)}
                                            placeholder="เช่น ฝากไว้ที่ lobby"
                                        />
                                    </div>
                                </div>

                                {/* Next Button */}
                                <button
                                    id="checkout-next-step"
                                    onClick={handleNextStep}
                                    className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl text-base font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
                                >
                                    ดำเนินการต่อ
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            /* ─── Step 2: Payment ─── */
                            <div className="space-y-6">
                                {/* Shipping Summary */}
                                <div className="bg-white rounded-[32px] border border-slate-100 p-6 sm:p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </div>
                                            <h3 className="text-base font-black text-slate-900 uppercase ">ที่อยู่จัดส่ง</h3>
                                        </div>
                                        <button
                                            onClick={() => setCurrentStep(1)}
                                            className="text-base font-bold text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            แก้ไข
                                        </button>
                                    </div>
                                    <div className="pl-11 text-base text-slate-600 space-y-0.5">
                                        <p className="font-bold text-slate-900">{form.fullName}</p>
                                        <p>{form.phone} · {form.email}</p>
                                        <p>{form.address}</p>
                                        <p>{form.district}, {form.province} {form.postalCode}</p>
                                        {form.note && <p className="text-slate-600 italic mt-1">&quot;{form.note}&quot;</p>}
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white rounded-[32px] border border-slate-100 p-6 sm:p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-black text-slate-900">วิธีชำระเงิน</h2>
                                            <p className="text-base text-slate-600 font-medium">เลือกวิธีชำระเงินที่ต้องการ</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <PaymentOption
                                            id="payment-promptpay"
                                            selected={paymentMethod === "promptpay"}
                                            onSelect={() => setPaymentMethod("promptpay")}
                                            title="PromptPay / QR Code"
                                            subtitle="ชำระผ่าน QR Code PromptPay ได้ทุกธนาคาร"
                                            icon={
                                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                                                </svg>
                                            }
                                            badge="แนะนำ"
                                        />

                                        <PaymentOption
                                            id="payment-bank-transfer"
                                            selected={paymentMethod === "bank_transfer"}
                                            onSelect={() => setPaymentMethod("bank_transfer")}
                                            title="โอนเงินผ่านธนาคาร"
                                            subtitle="โอนเงินแล้วแจ้งสลิปเพื่อยืนยันออเดอร์"
                                            icon={
                                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                                                </svg>
                                            }
                                        />

                                        <PaymentOption
                                            id="payment-cod"
                                            selected={paymentMethod === "cod"}
                                            onSelect={() => setPaymentMethod("cod")}
                                            title="ชำระเงินปลายทาง (COD)"
                                            subtitle="ชำระเงินเมื่อได้รับสินค้า +฿30"
                                            icon={
                                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                </svg>
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    id="place-order-button"
                                    onClick={handlePlaceOrder}
                                    disabled={isSubmitting}
                                    className={`w-full py-5 rounded-2xl text-base font-black uppercase  transition-all duration-200 flex items-center justify-center gap-3 shadow-xl ${isSubmitting
                                        ? "bg-slate-300 text-slate-700 cursor-not-allowed"
                                        : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98]"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                                            กำลังดำเนินการ...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                            </svg>
                                            ยืนยันคำสั่งซื้อ — ฿{grandTotal.toLocaleString()}
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-base text-slate-600 mt-2">
                                    เมื่อกดสั่งซื้อ คุณยอมรับ{" "}
                                    <Link href="#" className="text-blue-600 hover:underline">เงื่อนไขการใช้งาน</Link>
                                    {" "}และ{" "}
                                    <Link href="#" className="text-blue-600 hover:underline">นโยบายความเป็นส่วนตัว</Link>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[32px] border border-slate-100 p-6 sm:p-8 shadow-sm sticky top-28">
                            <h2 className="text-base font-black text-slate-900 uppercase  mb-6 flex items-center gap-2">
                                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                สรุปคำสั่งซื้อ ({totalItems} ชิ้น)
                            </h2>

                            {/* Items */}
                            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-3 group">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-100">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-bold text-slate-900 truncate leading-tight">{item.product.name}</h3>
                                            <p className="text-base text-slate-600 mt-0.5">จำนวน: {item.quantity}</p>
                                            <p className="text-base font-bold text-slate-900 mt-1">
                                                ฿{(item.product.price * 35 * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-slate-100 my-6" />

                            {/* Pricing Breakdown */}
                            <div className="space-y-3 text-base">
                                <div className="flex justify-between text-slate-700">
                                    <span>ราคาสินค้า</span>
                                    <span className="font-bold text-slate-700">฿{(totalPrice * 35).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-slate-700">
                                    <span>ค่าจัดส่ง</span>
                                    <span className={`font-bold ${shippingCost === 0 ? "text-emerald-600" : "text-slate-700"}`}>
                                        {shippingCost === 0 ? "ฟรี" : `฿${shippingCost}`}
                                    </span>
                                </div>
                                {paymentMethod === "cod" && (
                                    <div className="flex justify-between text-slate-700">
                                        <span>ค่าบริการ COD</span>
                                        <span className="font-bold text-slate-700">฿30</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-slate-100 my-4" />

                            <div className="flex justify-between items-center">
                                <span className="text-base font-bold text-slate-700">ยอดรวมทั้งหมด</span>
                                <span className="text-2xl font-black text-slate-900">
                                    ฿{(grandTotal + (paymentMethod === "cod" ? 30 : 0)).toLocaleString()}
                                </span>
                            </div>

                            {/* Free Shipping Notice */}
                            {shippingCost === 0 && (
                                <div className="mt-4 px-4 py-3 bg-emerald-50 rounded-xl flex items-center gap-2">
                                    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    <span className="text-base font-bold text-emerald-700">คุณได้รับส่งฟรี! (ยอดสั่งซื้อมากกว่า ฿1,500)</span>
                                </div>
                            )}
                            {shippingCost > 0 && (
                                <div className="mt-4 px-4 py-3 bg-amber-50 rounded-xl flex items-center gap-2">
                                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                    <span className="text-base font-bold text-amber-700">ช้อปเพิ่มอีก ฿{(1500 - totalPrice * 35).toLocaleString()} รับส่งฟรี!</span>
                                </div>
                            )}

                            {/* Security Badge */}
                            <div className="mt-6 flex items-center justify-center gap-2 text-slate-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <span className="text-base font-bold uppercase ">ข้อมูลของคุณปลอดภัย 100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Reusable Input Component ─── */
function InputField({
    id,
    label,
    value,
    onChange,
    error,
    placeholder,
    type = "text",
    multiline = false,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    type?: string;
    multiline?: boolean;
}) {
    const baseClass = `w-full px-5 py-3.5 bg-slate-50 border-2 rounded-xl outline-none transition-all text-base font-medium placeholder:text-slate-500 ${error
        ? "border-red-200 bg-red-50/50 focus:border-red-300"
        : "border-transparent focus:bg-white focus:border-slate-200"
        }`;

    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-base font-black uppercase text-slate-600 ml-1">
                {label}
            </label>
            {multiline ? (
                <textarea
                    id={id}
                    rows={2}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`${baseClass} resize-none`}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={baseClass}
                    placeholder={placeholder}
                />
            )}
            {error && (
                <p className="text-base font-bold text-red-500 ml-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}

/* ─── Payment Option Component ─── */
function PaymentOption({
    id,
    selected,
    onSelect,
    title,
    subtitle,
    icon,
    badge,
}: {
    id: string;
    selected: boolean;
    onSelect: () => void;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    badge?: string;
}) {
    return (
        <button
            id={id}
            onClick={onSelect}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${selected
                ? "border-slate-900 bg-slate-50 shadow-md shadow-slate-900/5"
                : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                }`}
        >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${selected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"} transition-colors`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">{title}</span>
                    {badge && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase  rounded-full">
                            {badge}
                        </span>
                    )}
                </div>
                <span className="text-base text-slate-600">{subtitle}</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? "border-slate-900" : "border-slate-200"}`}>
                {selected && <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />}
            </div>
        </button>
    );
}
