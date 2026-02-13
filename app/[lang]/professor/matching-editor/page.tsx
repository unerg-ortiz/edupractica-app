"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
    ArrowLeft,
    Settings,
    Search,
    Type,
    Image as ImageIcon,
    Plus,
    Eye,
    Save,
    CheckCircle2,
    Unlink,
    Download,
} from "lucide-react";

export default function MatchingEditor() {
    const t = useTranslations("MatchingEditor");
    const [activeTab, setActiveTab] = useState("libreria");

    return (
        <div className="min-h-screen bg-[#0a0f1b] text-white font-sans flex flex-col">
            {/* Header */}
            <header className="p-4 md:px-8 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#0a0f1b]/80 backdrop-blur-md z-30">
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            {t("title")}
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500">{t("subtitle")}</p>
                    </div>
                </div>

                {/* Desktop Tabs */}
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => setActiveTab("libreria")}
                        className={`px-4 py-2 text-sm font-semibold transition-all relative ${activeTab === "libreria"
                                ? "text-blue-500 after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                                : "text-slate-400 hover:text-white"
                            }`}
                    >
                        {t("library")}
                    </button>
                    <button
                        onClick={() => setActiveTab("configuracion")}
                        className={`px-4 py-2 text-sm font-semibold transition-all relative ${activeTab === "configuracion"
                                ? "text-blue-500 after:absolute after:bottom-[-17px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                                : "text-slate-400 hover:text-white"
                            }`}
                    >
                        {t("configuration")}
                    </button>
                </div>

                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                    <Settings className="w-6 h-6 text-slate-400" />
                </button>
            </header>

            {/* Mobile Tabs */}
            <div className="md:hidden flex border-b border-slate-800">
                <button
                    onClick={() => setActiveTab("libreria")}
                    className={`flex-1 py-3 text-sm font-semibold transition-all relative ${activeTab === "libreria"
                            ? "text-blue-500 after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                            : "text-slate-400"
                        }`}
                >
                    {t("library")}
                </button>
                <button
                    onClick={() => setActiveTab("configuracion")}
                    className={`flex-1 py-3 text-sm font-semibold transition-all relative ${activeTab === "configuracion"
                            ? "text-blue-500 after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                            : "text-slate-400"
                        }`}
                >
                    {t("configuration")}
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar / Library */}
                <aside
                    className={`w-full md:w-[280px] lg:w-[320px] bg-[#111827] border-r border-slate-800 flex flex-col transition-all ${activeTab === "libreria" ? "flex" : "hidden md:flex"
                        }`}
                >
                    <div className="p-4 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder={t("searchPlaceholder")}
                                className="w-full bg-[#1f2937] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex flex-col items-center justify-center p-4 bg-[#1e293b]/50 border border-slate-700 rounded-xl hover:bg-[#1e293b] hover:border-blue-500/50 transition-all group">
                                <div className="p-2 rounded-lg bg-blue-500/20 mb-2 group-hover:scale-110 transition-transform">
                                    <Type className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="text-xs font-semibold text-slate-400">{t("text")}</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 bg-[#1e293b]/50 border border-slate-700 rounded-xl hover:bg-[#1e293b] hover:border-blue-500/50 transition-all group">
                                <div className="p-2 rounded-lg bg-indigo-500/20 mb-2 group-hover:scale-110 transition-transform">
                                    <ImageIcon className="w-6 h-6 text-indigo-400" />
                                </div>
                                <span className="text-xs font-semibold text-slate-400">{t("image")}</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 pt-0">
                        <div className="grid grid-cols-2 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="aspect-square bg-[#1e293b] border border-slate-700 rounded-xl overflow-hidden hover:border-slate-500 cursor-pointer transition-all relative group"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br transition-opacity ${i === 1 ? "from-blue-500/20 to-cyan-500/20" :
                                            i === 2 ? "from-orange-500/20 to-yellow-500/20" :
                                                i === 3 ? "from-green-500/20 to-emerald-500/20" :
                                                    "from-purple-500/20 to-pink-500/20"
                                        }`} />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[1px] transition-opacity">
                                        <Plus className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Editor Area */}
                <main
                    className={`flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 transition-all ${activeTab === "libreria" ? "hidden md:flex" : "flex"
                        } flex-col items-center`}
                >
                    <div className="w-full max-w-2xl space-y-8">
                        <div className="flex items-center justify-between text-[10px] md:text-xs font-bold tracking-widest text-blue-500 uppercase">
                            <span className="w-1/2 text-center">{t("term")}</span>
                            <span className="w-1/2 text-center">{t("definition")}</span>
                        </div>

                        {/* Matching Rows */}
                        <div className="space-y-6">
                            {/* Row 1 - Connected */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 aspect-[2/1] bg-[#111827] border-2 border-blue-500 rounded-2xl flex items-center justify-center p-4 relative shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                    <span className="text-sm md:text-base font-semibold">Concepto A</span>
                                </div>
                                <div className="w-8 h-0.5 bg-blue-500 relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0a0f1b] rounded-full flex items-center justify-center">
                                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex-1 aspect-[2/1] bg-[#111827] border-2 border-blue-500 rounded-2xl flex items-center justify-center p-4 relative shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                    <span className="text-sm md:text-base font-semibold">Definición A</span>
                                </div>
                            </div>

                            {/* Row 2 - Empty */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 aspect-[2/1] border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center p-4 text-slate-500 hover:border-slate-500 hover:bg-slate-800/20 cursor-pointer transition-all group">
                                    <div className="p-2 rounded-full bg-slate-800 mb-2 group-hover:scale-110 transition-transform">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs font-semibold">{t("dragHere")}</span>
                                </div>
                                <div className="flex items-center justify-center text-slate-700">
                                    <Unlink className="w-6 h-6" />
                                </div>
                                <div className="flex-1 aspect-[2/1] border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center p-4 text-slate-500 hover:border-slate-500 hover:bg-slate-800/20 cursor-pointer transition-all group">
                                    <div className="p-2 rounded-full bg-slate-800 mb-2 group-hover:scale-110 transition-transform">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] md:text-xs font-semibold">{t("dragHere")}</span>
                                </div>
                            </div>

                            {/* Row 3 - Dropping state */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 aspect-[2/1] bg-[#1f2937]/50 border-2 border-slate-700 rounded-2xl flex items-center justify-center p-2 relative group overflow-hidden">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden mr-3 bg-gradient-to-br from-green-600/30 to-emerald-600/30 flex items-center justify-center">
                                        {/* Mock Image Placeholder */}
                                        <div className="w-10 h-10 rounded-full bg-green-500/40 relative">
                                            <div className="absolute inset-2 bg-green-400/60 rounded-full animate-pulse" />
                                        </div>
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold leading-none">Célula</span>
                                </div>
                                <div className="w-8 h-[2px] bg-slate-800" />
                                <div className="flex-1 aspect-[2/1] border-2 border-dashed border-blue-500/50 bg-blue-500/5 rounded-2xl flex flex-col items-center justify-center p-4 text-blue-400 group animate-pulse">
                                    <Download className="w-5 h-5 mb-2" />
                                    <span className="text-[10px] md:text-xs font-bold">{t("dropToJoin")}</span>
                                </div>
                            </div>

                            {/* New Pair Button */}
                            <button className="w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center gap-3 text-slate-500 hover:bg-slate-800/30 hover:border-slate-700 hover:text-slate-300 transition-all group">
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                <span className="text-sm font-bold">{t("newPair")}</span>
                            </button>
                        </div>

                        {/* Status Badge */}
                        <div className="flex justify-center pt-8">
                            <div className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 rounded-full shadow-[0_8px_25px_rgba(37,99,235,0.3)] animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-xs font-bold">{t("linkCreated")}</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer Actions */}
            <footer className="p-4 md:px-8 bg-[#0a0f1b] border-t border-slate-800 flex items-center justify-center md:justify-end gap-4 z-40">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 rounded-xl font-bold text-sm bg-slate-900/50 hover:bg-slate-800 transition-all">
                    <Eye className="w-4 h-4" />
                    {t("preview")}
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm shadow-[0_8px_20px_rgba(37,99,235,0.2)] transition-all">
                    <Save className="w-4 h-4" />
                    {t("saveChallenge")}
                </button>
            </footer>
        </div>
    );
}
