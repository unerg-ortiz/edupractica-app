"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FeedbackModal } from "@/components/Teacher/FeedbackModal";

export default function ChallengeEditorPage() {
    const t = useTranslations("ChallengeEditor");
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0F1115] font-sans selection:bg-blue-500/30">

            {/* Top Bar / Header */}
            <header className="flex h-16 items-center justify-between border-b border-white/5 bg-[#0F1115] px-6">
                <div className="flex items-center gap-4">
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-sm font-medium text-gray-400">{t("title")} <span className="ml-2 text-xs rounded bg-blue-500/10 px-1.5 py-0.5 text-blue-400">{t("preview")}</span></h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t("all_buckets")}</button>
                    <button className="text-sm font-medium text-blue-400 border-b-2 border-blue-500 pb-0.5">{t("item_pool")}</button>
                </div>
            </header>

            <main className="relative mx-auto max-w-5xl p-8">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">{t("organize_title")}</h2>
                    <p className="text-gray-400">{t("organize_subtitle")}</p>
                </div>

                {/* Categories / Buckets Mockup */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                    {[
                        { name: t("category_running"), color: 'from-orange-500/10 to-orange-500/5', border: 'border-orange-500/20' },
                        { name: t("category_jumping"), color: 'from-green-500/10 to-green-500/5', border: 'border-green-500/20' }
                    ].map((category) => (
                        <div key={category.name} className={`h-64 rounded-2xl border ${category.border} bg-gradient-to-br ${category.color} p-6 relative group overflow-hidden`}>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-white/90">{category.name}</span>
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            {/* Placeholder content for bucket */}
                        </div>
                    ))}
                </div>

                {/* Item Pool Mockup - The 'Apple' item from the screenshot story */}
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">{t("item_pool")}</h3>
                    <div className="flex gap-4">
                        <div className="relative group cursor-pointer" onClick={() => setIsFeedbackModalOpen(true)}>
                            <div className="w-32 h-32 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center hover:border-blue-500/50 hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                                    <span className="text-2xl">🍎</span>
                                </div>
                                <span className="text-sm font-medium text-white">{t("item_apple")}</span>
                            </div>
                            {/* Simulated "Edit Feedback" hover trigger */}
                            <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>

                        {/* Other items */}
                        <div className="w-32 h-32 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center opacity-50">
                            <span className="text-sm font-medium text-gray-500">{t("item_fast")}</span>
                        </div>
                    </div>
                </div>

                {/* Action Bar mockup */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#1A1D26] border border-white/10 p-2 rounded-2xl shadow-2xl backdrop-blur-xl">
                    <button className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
                        {t("save_challenge")}
                    </button>
                    <button
                        className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/5 transition-colors"
                        onClick={() => setIsFeedbackModalOpen(true)}
                    >
                        {t("manage_feedback")}
                    </button>
                </div>

            </main>

            {/* Render the Feedback Modal */}
            <FeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
            />

        </div>
    );
}
