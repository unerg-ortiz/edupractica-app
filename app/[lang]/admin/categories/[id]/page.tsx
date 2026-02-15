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
    LayoutGrid,
    BarChart,
    Settings
} from 'lucide-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

// Interfaces for Mock Data
interface Topic {
    id: string;
    name: string;
    updatedAt: string;
}

interface CategoryDetail {
    id: string;
    name: string;
    description: string;
    totalTopics: number;
    totalStudents: number;
    topics: Topic[];
}

export default function CategoryDetailPage({ params }: { params: { lang: string, id: string } }) {
    const t = useTranslations('Categories.detail');
    const tNav = useTranslations('Admin.nav'); // Assuming reused from list
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data based on the user request image
    const category: CategoryDetail = {
        id: params.id,
        name: 'Desarrollo de Software',
        description: 'Administre y supervise todos los recursos educativos relacionados con el ciclo de vida del desarrollo, desde la arquitectura hasta el despliegue.',
        totalTopics: 24,
        totalStudents: 1240,
        topics: [
            { id: '1', name: 'Introducción a React 18', updatedAt: 'Actualizado hace 2 días' },
            { id: '2', name: 'Arquitectura de Microservicios', updatedAt: 'Actualizado hace 1 semana' },
            { id: '3', name: 'Bases de Datos NoSQL', updatedAt: 'Actualizado hace 3 semanas' },
            { id: '4', name: 'Clean Code & Solid', updatedAt: 'Actualizado ayer' },
            { id: '5', name: 'DevOps con Docker y K8s', updatedAt: 'Actualizado hace 1 mes' },
        ]
    };

    const filteredTopics = category.topics.filter(topic =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-sans pb-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/10 blur-[100px] pointer-events-none" />

            <div className="max-w-md mx-auto p-6 relative z-10">
                {/* Header */}
                <header className="flex items-center gap-4 mb-8">
                    <Link
                        href={`/${params.lang}/admin/categories`}
                        className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-lg font-bold text-slate-200">
                        {t('title')}
                    </h1>
                </header>

                {/* Category Info */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                        {category.name}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {category.description}
                    </p>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#111625] p-5 rounded-3xl border border-white/5 flex flex-col justify-between h-32 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Book className="w-16 h-16 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                            <Book className="w-4 h-4 text-blue-500" />
                            {t('metrics.totalTopics')}
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {category.totalTopics}
                        </div>
                    </div>

                    <div className="bg-[#111625] p-5 rounded-3xl border border-white/5 flex flex-col justify-between h-32 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users className="w-16 h-16 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                            <Users className="w-4 h-4 text-blue-500" />
                            {t('metrics.students')}
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {category.totalStudents.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Topics Section */}
                <div className="mb-4 flex items-end justify-between">
                    <h3 className="text-lg font-bold text-white">
                        {t('associatedTopics')}
                    </h3>
                    <button className="text-blue-500 text-xs font-bold hover:text-blue-400 transition-colors">
                        {t('viewAll')}
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#151b2d] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    />
                </div>

                {/* Topics List */}
                <div className="space-y-3">
                    {filteredTopics.map((topic) => (
                        <div
                            key={topic.id}
                            className="group flex items-center justify-between bg-[#111625] hover:bg-[#161c2e] p-4 rounded-2xl border border-white/5 transition-all cursor-pointer active:scale-[0.98]"
                        >
                            <div>
                                <h4 className="font-bold text-white text-sm mb-1">
                                    {topic.name}
                                </h4>
                                <p className="text-slate-500 text-xs font-medium">
                                    {topic.updatedAt}
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                    ))}

                    {filteredTopics.length === 0 && (
                        <div className="text-center py-8 text-slate-500 text-sm">
                            No se encontraron temas.
                        </div>
                    )}
                </div>

                {/* Bottom Action Button */}
                <div className="mt-8">
                    <button
                        onClick={() => router.push(`/${params.lang}/admin/categories`)}
                        className="w-full bg-[#151b2d] border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        {t('backToList')}
                    </button>
                </div>
            </div>
        </div>
    );
}
