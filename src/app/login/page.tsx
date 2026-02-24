"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSocialLogin = (provider: string) => {
        // This will be connected to Supabase later
        console.log(`Logging in with ${provider}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login attempted with:", email, password);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-32">
            <div className="w-full max-w-[420px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-8 sm:p-12">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center ring-4 ring-slate-50">
                            <span className="text-white font-light">T</span>
                        </div>
                        <span className="text-xl font-black tracking-tighter uppercase">Toytown</span>
                    </Link>
                    <h1 className="text-2xl font-black text-slate-900 mb-1">ยินดีต้อนรับ</h1>
                    <p className="text-slate-400 text-[11px] font-black uppercase ">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
                </div>

                {/* Email/Pass Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase text-slate-600 ml-1">อีเมล</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-100 rounded-2xl outline-none transition-all text-sm font-bold"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-black uppercase text-slate-600">รหัสผ่าน</label>
                            <Link href="#" className="text-[10px] font-black uppercase  text-blue-600 hover:text-blue-700">ลืมรหัสผ่าน?</Link>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:bg-white focus:border-slate-100 rounded-2xl outline-none transition-all text-sm font-bold"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-slate-900 text-white rounded-2xl text-base font-black uppercase hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-100"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>

                {/* Separator */}
                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-slate-400 font-bold  text-[10px]">หรือเข้าสู่ระบบด้วย</span>
                    </div>
                </div>

                {/* Social Login Options (Compact) */}
                <div className="flex items-center justify-center gap-4">
                    {/* Google */}
                    <button
                        onClick={() => handleSocialLogin('google')}
                        className="w-14 h-14 border-2 border-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90 group"
                        title="Google"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.06 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                            <path fill="#34A853" d="M16.04 18.013c-1.09.693-2.459 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823L3.25 17.38c1.959 3.953 6.031 6.62 10.75 6.62 3.037 0 5.611-1.013 7.754-2.727l-3.714-3.26Z" />
                            <path fill="#4285F4" d="M22 12c0-.897-.077-1.76-.22-2.59H12v4.904h5.613c-.242 1.296-1.012 2.394-2.106 3.123v3.235h3.41c1.995-1.837 3.144-4.542 3.144-7.672z" />
                            <path fill="#FBBC05" d="M5.266 14.269a7.072 7.072 0 0 1 0-4.504l-4.026-3.115a11.97 11.97 0 0 0 0 10.734l4.026-3.115Z" />
                        </svg>
                    </button>

                    {/* LINE */}
                    <button
                        onClick={() => handleSocialLogin('line')}
                        className="w-14 h-14 border-2 border-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90 group"
                        title="LINE"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#06C755">
                            <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.035 9.608.391.084.922.258 1.057.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645s6.938-4.085 9.471-6.992c1.724-1.821 2.514-3.793 2.514-5.951z" />
                        </svg>
                    </button>

                    {/* Facebook */}
                    <button
                        onClick={() => handleSocialLogin('facebook')}
                        className="w-14 h-14 border-2 border-slate-50 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all active:scale-90 group"
                        title="Facebook"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12.073-12-12.073s-12 5.446-12 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </button>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-[11px] font-black uppercase ">
                        ยังไม่ได้เป็นสมาชิก ?{" "}
                        <Link href="#" className="text-blue-600 hover:text-blue-700 ml-1">สมัครสมาชิกเลย</Link>
                    </p>
                </div>
            </div>
        </div >
    );
}
