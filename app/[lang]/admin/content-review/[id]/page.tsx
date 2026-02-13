"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
    ChevronLeft,
    MoreVertical,
    Play,
    User,
    FileText,
    ChevronRight,
    X,
    CheckCircle2,
    MessageSquare,
    Calendar
} from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ContentReviewPage() {
    const t = useTranslations('ContentReview');
    const { id, lang } = useParams();
    const [adminNotes, setAdminNotes] = useState('');

    const mockData = {
        title: "Fundamentos de Jerarquía Visual",
        professor: "Prof. Carlos Ruiz",
        materialsCount: 12,
        updatedAt: "24 May",
        category: "UX/UI DESIGN",
        description: "Este módulo cubre los principios básicos de jerarquía visual, teoría del color y accesibilidad en interfaces móviles. Se exploran casos de estudio de aplicaciones líderes y cómo aplican estos conceptos para mejorar la experiencia del usuario final.",
        stages: [
            { id: 1, title: "Introducción a la Composición", meta: "4:20 min • Video", type: "video" },
            { id: 2, title: "Leyes de la Gestalt aplicadas", meta: "Lectura técnica", type: "reading" },
            { id: 3, title: "Ejercicios de Contraste", meta: "Proyecto Práctico", type: "project" }
        ]
    };

    return (
        <div className="min-h-screen bg-[#080C14] text-white selection:bg-blue-500/30 font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#080C14]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href={`/${lang}/admin/categories`} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors group">
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold tracking-tight text-white/90">
                                {t('title')}
                            </h1>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-black">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col items-end opacity-60">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-300">
                            {t('panelTitle')}
                        </p>
                        <p className="text-[10px] font-bold">
                            {t('updatedAt', { date: mockData.updatedAt })}
                        </p>
                    </div>

                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <MoreVertical className="w-6 h-6 text-slate-400" />
                    </button>
                </div>
            </header>

            <main className="pt-28 pb-40 max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Video & Metadata */}
                    <div className="lg:col-span-7 space-y-10">
                        {/* Video Player Placeholder */}
                        <div className="relative aspect-video rounded-[32px] overflow-hidden bg-slate-900 shadow-2xl group border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop"
                                alt="Video Thumbnail"
                                className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Blue Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="w-20 h-20 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all hover:scale-110 active:scale-95 group/btn">
                                    <Play className="w-8 h-8 fill-white text-white ml-1 group-hover/btn:scale-115 transition-transform" />
                                </button>
                            </div>
                            {/* Player Bar */}
                            <div className="absolute bottom-6 left-8 right-8 space-y-3">
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                                    <div className="h-full w-[45%] bg-blue-500 relative flex items-center justify-end">
                                        <div className="absolute -right-1.5 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] border-2 border-blue-600" />
                                    </div>
                                </div>
                                <div className="flex justify-between text-[11px] font-black tracking-widest text-white/50 px-1">
                                    <span>08:42</span>
                                    <span>15:00</span>
                                </div>
                            </div>
                        </div>

                        {/* Badges & Title */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <span className="bg-[#1E293B] px-3 py-1.5 rounded-md text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                                    {mockData.category}
                                </span>
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Actualizado: {mockData.updatedAt}
                                </div>
                            </div>

                            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                                {mockData.title}
                            </h2>

                            <div className="flex flex-wrap gap-4">
                                <div className="bg-[#111827] border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#1F2937] transition-colors cursor-default">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-300">{mockData.professor}</span>
                                </div>
                                <div className="bg-[#111827] border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#1F2937] transition-colors cursor-default">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-300">
                                        {t('materials', { count: mockData.materialsCount })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]" />
                                <h3 className="text-2xl font-black tracking-tight text-white/95">{t('topicDescription')}</h3>
                            </div>
                            <p className="text-xl text-slate-400 leading-relaxed font-medium">
                                {mockData.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Steps & Admin Input */}
                    <div className="lg:col-span-5 space-y-12">
                        {/* Learning Stages */}
                        <section className="space-y-8">
                            <h3 className="text-2xl font-black tracking-tight text-white/90">{t('learningStages')}</h3>
                            <div className="space-y-4">
                                {mockData.stages.map((stage) => (
                                    <div
                                        key={stage.id}
                                        className="group flex items-center justify-between bg-[#0F172A] hover:bg-[#1E293B] p-6 rounded-[32px] border border-white/5 hover:border-blue-500/20 transition-all duration-300 cursor-pointer shadow-xl"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-full bg-[#1E293B] flex items-center justify-center text-blue-500 font-black text-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                                                {stage.id}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-200 text-lg group-hover:text-white transition-colors">
                                                    {stage.title}
                                                </h4>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                                                    {stage.meta}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Admin Notes Section */}
                        <section className="bg-[#111827]/80 backdrop-blur-xl rounded-[44px] border border-blue-500/10 p-10 space-y-8 shadow-2xl">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-blue-500/10 rounded-xl">
                                    <MessageSquare className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400/80">
                                    {t('adminNotes.title')}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <textarea
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder={t('adminNotes.placeholder')}
                                    className="w-full bg-[#080C14] border border-white/5 rounded-3xl p-8 text-slate-200 placeholder-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all min-h-[180px] resize-none font-semibold text-lg"
                                />
                                <p className="text-[11px] font-bold text-slate-600 text-center uppercase tracking-widest leading-relaxed">
                                    {t('adminNotes.footer')}
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Sticky Actions Footer */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#080C14]/95 backdrop-blur-3xl border-t border-white/5 py-8 px-8">
                <div className="max-w-4xl mx-auto flex gap-6">
                    <button className="flex-1 flex items-center justify-center gap-4 bg-[#111827] hover:bg-[#1F2937] border border-white/10 text-slate-300 font-black py-6 rounded-3xl transition-all hover:scale-[1.02] active:scale-95 group shadow-lg">
                        <X className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                        <span className="text-lg tracking-tight">{t('buttons.reject')}</span>
                    </button>
                    <button className="flex-[1.5] flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-95 group">
                        <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-lg tracking-tight">{t('buttons.approve')}</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
