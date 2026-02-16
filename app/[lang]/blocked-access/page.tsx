"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Headset, Shield, Lock, Moon } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function BlockedAccessPage() {
    const t = useTranslations('BlockedAccess');

    return (
        <div className="min-h-screen bg-[#050511] flex flex-col font-sans p-6 text-white relative overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Header / Top Bar */}
            <header className="flex items-center justify-between px-4 py-4 md:px-8 relative z-10 w-full max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-500 fill-blue-500" />
                    <span className="text-xl font-bold tracking-tight text-white uppercase">{t('platformName')}</span>
                </div>
                <div className="p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                    <Moon className="w-6 h-6 text-slate-400" />
                </div>
            </header>

            {/* Main Content Card */}
            <main className="flex-1 flex flex-col justify-center items-centerw-full relative z-10 p-4">
                <div className="w-full max-w-[420px] mx-auto bg-[#0f1523] rounded-[2.5rem] p-8 border border-[#1e293b] shadow-2xl relative overflow-hidden">
                    {/* Top blue accent line inside card? Image shows a blue line at very top or just border. Let's add a top highlight */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500/80" />

                    {/* Icon */}
                    <div className="flex justify-center mb-8 mt-4">
                        <div className="relative">
                            <div className="w-24 h-24 bg-[#111827] rounded-full flex items-center justify-center shadow-inner border border-white/5">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                                <Lock className="w-10 h-10 text-blue-400 relative z-10" />
                                <div className="absolute bottom-1 right-1 bg-[#1e293b] rounded-full p-1.5 border border-white/10 z-20">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-center mb-4 text-white tracking-tight">
                        {t('title')}
                    </h2>

                    {/* Description */}
                    <p className="text-center text-slate-400 text-sm mb-8 leading-relaxed px-4">
                        {t('description')}
                    </p>

                    {/* Reason Box */}
                    <div className="bg-[#161e31] rounded-2xl p-5 mb-8 text-center border border-white/5 shadow-inner">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">
                            {t('reasonLabel')}
                        </p>
                        <p className="text-white font-bold text-lg">
                            {t('reasonSpam')}
                        </p>
                    </div>

                    {/* Buttons */}
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mb-6 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                        <Headset className="w-5 h-5" />
                        {t('contactSupport')}
                    </button>

                    <button
                        onClick={() => { }}
                        className="w-full text-center text-slate-400 text-sm font-medium hover:text-white transition-colors"
                    >
                        {t('logout')}
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-6 text-slate-600 text-xs font-medium relative z-10">
                {t('footer')}
            </footer>
        </div>
    );
}
