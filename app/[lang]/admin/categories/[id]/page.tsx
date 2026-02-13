"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
    ChevronLeft,
    Search,
    Book,
    Users,
    ChevronRight,
    Search as SearchIcon,
    Code,
    Database,
    Palette,
    Zap,
    Share2,
    SunMoon
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Topic {
    id: string;
    name: string;
    updatedAt: string;
    icon: React.ReactNode;
    iconColor: string;
}

interface CategoryDetail {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    totalTopics: number;
    totalStudents: number;
    topics: Topic[];
}

export default function CategoryDetailPage({ params }: { params: { lang: string, id: string } }) {
    const t = useTranslations('Categories.detail');
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data based on the user request image
    const category: CategoryDetail = {
        id: params.id,
        name: 'Desarrollo Web',
        subtitle: 'Fullstack',
        description: 'Esta categoría engloba todos los módulos relacionados con el desarrollo de aplicaciones modernas, desde el frontend con React hasta el backend con Node.js y bases de datos. Aprende a construir soluciones robustas y escalables de extremo a extremo.',
        totalTopics: 24,
        totalStudents: 1250,
        topics: [
            { id: '1', name: 'Introducción a ES6+', updatedAt: 'Actualizado hace 2 días', icon: <span className="font-bold text-xs">JS</span>, iconColor: 'text-yellow-400' },
            { id: '2', name: 'Manejo de API REST', updatedAt: 'Actualizado hace 1 semana', icon: <Share2 className="w-5 h-5" />, iconColor: 'text-blue-400' },
            { id: '3', name: 'Bases de Datos NoSQL', updatedAt: 'Actualizado hace 2 semanas', icon: <Database className="w-5 h-5" />, iconColor: 'text-blue-500' },
            { id: '4', name: 'Tailwind CSS Avanzado', updatedAt: 'Actualizado ayer', icon: <Palette className="w-5 h-5" />, iconColor: 'text-cyan-400' },
            { id: '5', name: 'Node.js y Express Core', updatedAt: 'Actualizado hace 1 mes', icon: <Code className="w-5 h-5" />, iconColor: 'text-green-500' },
        ]
    };

    const filteredTopics = category.topics.filter(topic =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
            </div>

            {/* Header / Nav */}
            <nav className="relative z-10 max-w-7xl mx-auto px-8 py-10 flex items-center justify-between">
                <Link
                    href={`/${params.lang}/admin/categories`}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all hover:-translate-x-1 font-semibold group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:scale-110" />
                    <span className="text-base">Volver al listado</span>
                </Link>
                <h1 className="text-[11px] uppercase tracking-[0.3em] font-black text-slate-500/80">
                    DETALLE DE CATEGORÍA
                </h1>
                <div className="w-32 hidden sm:block" />
            </nav>

            <main className="relative z-10 max-w-4xl mx-auto px-8 pt-6 pb-32">
                {/* Hero Section */}
                <header className="mb-16">
                    <h2 className="text-6xl sm:text-7xl font-black text-white mb-2 tracking-tight">
                        {category.name}
                    </h2>
                    <h3 className="text-6xl sm:text-7xl font-black text-[#3B82F6] mb-10 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        {category.subtitle}
                    </h3>
                    <p className="text-[#94A3B8] text-xl leading-relaxed max-w-2xl font-medium">
                        {category.description}
                    </p>
                </header>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
                    <div className="bg-[#0F172A]/50 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 flex items-center gap-8 group hover:border-blue-500/30 transition-all hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]">
                        <div className="bg-[#1E293B] p-5 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <Book className="w-10 h-10 text-blue-500" />
                        </div>
                        <div>
                            <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Temas Totales</div>
                            <div className="text-5xl font-black text-white">{category.totalTopics}</div>
                        </div>
                    </div>

                    <div className="bg-[#0F172A]/50 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 flex items-center gap-8 group hover:border-blue-500/30 transition-all hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]">
                        <div className="bg-[#1E293B] p-5 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <Users className="w-10 h-10 text-blue-500" />
                        </div>
                        <div>
                            <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Estudiantes</div>
                            <div className="text-5xl font-black text-white">{category.totalStudents.toLocaleString()}</div>
                        </div>
                    </div>
                </div>

                {/* Topics Section */}
                <section>
                    <div className="flex items-center justify-between mb-10">
                        <h4 className="text-3xl font-black text-white tracking-tight">Temas Asociados</h4>
                        <Link href="#" className="text-blue-400 text-sm font-black flex items-center gap-2 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                            Ver todos <Zap className="w-3.5 h-3.5 rotate-45" />
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-10 group">
                        <div className="absolute inset-0 bg-blue-500/5 blur-lg rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <SearchIcon className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6 transition-colors group-focus-within:text-blue-400" />
                        <input
                            type="text"
                            placeholder="Buscar temas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="relative w-full bg-[#0F172A]/80 border border-slate-800/50 rounded-3xl py-6 pl-20 pr-8 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-lg font-semibold"
                        />
                    </div>

                    {/* Topics List */}
                    <div className="space-y-5">
                        {filteredTopics.map((topic) => (
                            <div
                                key={topic.id}
                                className="group flex items-center justify-between bg-[#0F172A]/40 hover:bg-[#1E293B]/60 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all cursor-pointer shadow-lg hover:shadow-2xl active:scale-[0.99] duration-300"
                            >
                                <div className="flex items-center gap-8">
                                    <div className={`p-4 rounded-2xl bg-[#0F172A] border border-white/5 ${topic.iconColor} group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                                        {topic.icon}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-white text-xl mb-1 group-hover:text-blue-400 transition-colors">
                                            {topic.name}
                                        </h5>
                                        <p className="text-slate-500 text-base font-medium">
                                            {topic.updatedAt}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-3 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        ))}

                        {filteredTopics.length === 0 && (
                            <div className="text-center py-20 text-slate-500 bg-[#0F172A]/20 rounded-[40px] border border-dashed border-slate-800/50">
                                <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-10" />
                                <p className="text-xl font-medium">No se encontraron temas para esta categoría.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 max-w-7xl mx-auto px-8 py-16 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8 text-slate-500 font-medium">
                <p>© 2024 Plataforma de Aprendizaje. Todos los derechos reservados.</p>
                <div className="flex items-center gap-10">
                    <Link href="#" className="hover:text-white transition-colors">Términos</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
                </div>
            </footer>

            {/* Floating Theme Toggle (Side position as in image) */}
            <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50">
                <button className="w-16 h-16 bg-[#3B82F6] hover:bg-blue-400 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:scale-110 hover:rotate-12 active:scale-95 group">
                    <SunMoon className="w-8 h-8 group-hover:animate-pulse" />
                </button>
            </div>
        </div>
    );
}
