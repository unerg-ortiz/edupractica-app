"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
    Search,
    Filter,
    Play,
    Clock,
    ChevronRight,
    LayoutGrid,
    List
} from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ContentReviewDashboard() {
    const t = useTranslations('ContentReview');
    const { lang } = useParams();
    const [searchQuery, setSearchQuery] = useState('');

    const pendingTopics = [
        {
            id: "1",
            title: "Fundamentos de Jerarquía Visual",
            professor: "Prof. Carlos Ruiz",
            category: "UX/UI DESIGN",
            updatedAt: "Hace 2 horas",
            duration: "15:00 min",
            thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop"
        },
        {
            id: "2",
            title: "Introducción a React Hooks",
            professor: "Prof. Elena Méndez",
            category: "WEB DEVELOPMENT",
            updatedAt: "Hace 5 horas",
            duration: "24:15 min",
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: "3",
            title: "Bases de Datos con MongoDB",
            professor: "Prof. Javier Soto",
            category: "BACKEND",
            updatedAt: "Ayer",
            duration: "42:00 min",
            thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2121&auto=format&fit=crop"
        }
    ];

    const filteredTopics = pendingTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.professor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#080C14] text-white selection:bg-blue-500/30 pb-32">
            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full" />
            </div>

            <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16">
                {/* Header */}
                <header className="mb-12 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white/95">
                                {t('dashboardTitle')}
                            </h1>
                            <p className="text-slate-400 text-lg font-medium">
                                {t('dashboardSubtitle')}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                            <button className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                            <button className="p-2.5 text-slate-500 hover:text-white transition-colors">
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar por título o profesor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#111827]/80 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all font-semibold"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-3 bg-[#111827]/80 border border-white/5 px-8 py-5 rounded-2xl font-black text-slate-400 hover:text-white hover:bg-[#1E293B] transition-all">
                        <Filter className="w-5 h-5" />
                        <span>Filtros</span>
                    </button>
                </div>

                {/* List Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTopics.map((topic) => (
                        <Link
                            key={topic.id}
                            href={`/${lang}/admin/content-review/${topic.id}`}
                            className="group relative bg-[#0F172A] rounded-[36px] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] hover:-translate-y-2 duration-500"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <img
                                    src={topic.thumbnail}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    alt={topic.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/30 flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                        {t('pending')}
                                    </span>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                                        <Play className="w-6 h-6 fill-white ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-8 space-y-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                                        {topic.category}
                                    </span>
                                    <h3 className="text-xl font-black text-white leading-tight group-hover:text-blue-400 transition-colors">
                                        {topic.title}
                                    </h3>
                                </div>

                                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10" />
                                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors">
                                            {topic.professor}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {topic.duration}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 flex items-center justify-between">
                                    <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                                        <ChevronRight className="w-3 h-3 text-blue-500" />
                                        {topic.updatedAt}
                                    </p>
                                    <span className="text-xs font-black text-blue-400 group-hover:translate-x-1 transition-transform">
                                        {t('viewDetail')}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredTopics.length === 0 && (
                    <div className="py-32 text-center space-y-4">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-slate-700" />
                        </div>
                        <h3 className="text-2xl font-black text-white/50">No se encontraron temas</h3>
                        <p className="text-slate-600">Prueba con otros términos de búsqueda.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
