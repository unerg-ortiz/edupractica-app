"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Lock, Headset } from 'lucide-react';
import Link from 'next/link';
export default function BlockedAccessPage() {
    const t = useTranslations('BlockedAccess');

    return (
        <div className="min-h-screen bg-[#050511] flex flex-col font-sans p-6 text-white relative overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Header / Top Bar */}
            <div className="flex items-center justify-center py-4 relative z-10">
                <h1 className="text-lg font-bold tracking-wide">Acceso</h1>
                <div className="absolute left-0">
                    <Link href="#" className="p-2">
                        {/* Back Arrow - visually present in image, though logically weird for block screen, keeping for fidelity */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full relative z-10">
                <div className="bg-[#0f1523] rounded-3xl p-8 border border-white/5 shadow-2xl">

                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="w-20 h-20 bg-[#162032] rounded-full flex items-center justify-center">
                                <Lock className="w-10 h-10 text-cyan-400 fill-cyan-400/20" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#162032] p-1 rounded-full">
                                <div className="bg-cyan-900 rounded-full p-1">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center mb-4 text-white">
                        {t('title')}
                    </h2>

                    {/* Description */}
                    <p className="text-center text-gray-400 text-sm mb-8 leading-relaxed">
                        {t('description')}
                    </p>

                    {/* Reason Box */}
                    <div className="bg-[#1a2333] rounded-xl p-4 mb-8 text-center border border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                            {t('reasonLabel')}
                        </p>
                        <p className="text-white font-semibold">
                            Spam
                        </p>
                    </div>

                    {/* Buttons */}
                    <button className="w-full bg-[#1da1f2] hover:bg-[#1a94df] text-white font-bold py-4 rounded-xl mb-6 shadow-lg shadow-[#1da1f2]/20 flex items-center justify-center gap-2 transition-all">
                        <Headset className="w-5 h-5" />
                        {t('contactSupport')}
                    </button>

                    <button
                        onClick={() => console.log('Logout')}
                        className="w-full text-center text-[#1da1f2] text-sm font-semibold hover:text-[#1a94df] transition-colors"
                    >
                        {t('logout')}
                    </button>
                </div>
            </div>

            {/* Footer Version */}
            <div className="text-center py-6 text-gray-600 text-xs font-medium">
                Versión 3.0.0 (Estudiante)
            </div>
        </div>
    );
}
