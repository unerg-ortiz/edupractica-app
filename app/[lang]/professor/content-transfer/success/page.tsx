"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TransferSuccessPage() {
    const t = useTranslations('ContentTransfer.success');
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-96 bg-emerald-900/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full relative z-10 text-center">
                {/* Success Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        {/* Outer ring with animation */}
                        <div className="absolute inset-0 bg-emerald-600/20 rounded-full animate-ping" />

                        {/* Main circle */}
                        <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-600/50">
                            <Check className="w-12 h-12 text-white" strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-3xl font-bold text-white mb-4">
                    {t('title')}
                </h1>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    {t('description')}
                </p>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-[#0f1629] to-[#0B1120] border border-emerald-900/30 rounded-3xl p-6 mb-8 shadow-xl shadow-black/20">
                    <div className="flex items-start gap-4 text-left">
                        <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                            <Check className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-base mb-2">
                                {t('nextSteps.title')}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {t('nextSteps.description')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => router.push('/professor/dashboard')}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {t('goToDashboard')}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => router.push('/professor/content-transfer/history')}
                        className="w-full bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-medium py-4 rounded-2xl transition-all"
                    >
                        {t('viewHistory')}
                    </button>
                </div>

                {/* Bottom Divider */}
                <div className="mt-12 flex justify-center">
                    <div className="w-32 h-1 bg-slate-800 rounded-full" />
                </div>
            </div>
        </div>
    );
}
