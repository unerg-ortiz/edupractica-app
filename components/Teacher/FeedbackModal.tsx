"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";


interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const t = useTranslations("FeedbackModal");
    // Ideally we won't hardcode default state either if we want full i18n, but for state initialization:
    const [failureMessage, setFailureMessage] = useState(t("default_failure", { item: "Apple" }));
    const [successHint, setSuccessHint] = useState(t("default_success", { item: "Apple" }));
    const [maxHints, setMaxHints] = useState(3);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="fixed inset-x-0 bottom-0 z-50 w-full max-w-lg mx-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 rounded-t-2xl md:rounded-2xl border border-white/10 bg-[#1A1D26] p-6 shadow-2xl ring-1 ring-white/10 animate-in slide-in-from-bottom duration-300 md:slide-in-from-bottom-10 md:fade-in-0">

                {/* Handle bar for mobile */}
                <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-white/20 md:hidden" />

                <div className="flex items-start gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                        <svg
                            className="h-6 w-6 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">{t("title")}</h2>
                        <p className="text-sm text-gray-400">{t("custom_messages_for")} &quot;Apple&quot;</p>
                    </div>
                </div>

                <div className="space-y-5">
                    {/* Failure Message Section */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            {t("failure_message_label")}
                        </label>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-1 transition-colors focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50">
                            <textarea
                                value={failureMessage}
                                onChange={(e) => setFailureMessage(e.target.value)}
                                rows={3}
                                className="w-full resize-none bg-transparent px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
                            />
                            <div className="flex items-center justify-between border-t border-white/10 px-2 py-2">
                                <span className="text-xs text-gray-500">{t("supports_markdown")}</span>
                                <div className="flex gap-2">
                                    <button className="rounded p-1 text-gray-400 hover:bg-white/10 hover:text-white" title="Add Image">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                    <button className="rounded p-1 text-gray-400 hover:bg-white/10 hover:text-white" title="Add Audio">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Success Hint Section */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            {t("success_hint_label")}
                        </label>
                        <input
                            type="text"
                            value={successHint}
                            onChange={(e) => setSuccessHint(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                        />
                    </div>

                    {/* Scaffolding Control Section */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-300">
                                {t("max_hints_label")}
                            </label>
                            <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded">{maxHints}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={maxHints}
                            onChange={(e) => setMaxHints(parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                        />
                        <p className="mt-1 text-xs text-gray-500">{t("max_hints_help")}</p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                        {t("cancel")}
                    </button>
                    <button
                        onClick={onClose} // Functionality would go here
                        className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        {t("apply_changes")}
                    </button>
                </div>
            </div>
        </>
    );
}
