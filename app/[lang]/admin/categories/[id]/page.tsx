"use client";

import React, { use } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Calendar, Hash } from 'lucide-react';
import { getIcon } from '@/components/admin/categories/iconMap';

export default function CategoryDetailPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
    const { lang, id } = use(params);
    const t = useTranslations('Categories');

    // Mock data for detail view since we don't have API
    const category = {
        id: id,
        name: 'Matemáticas Avanzadas',
        description: 'Curso completo de matemáticas para niveles avanzados cubriendo cálculo, álgebra lineal y más.',
        topicsCount: 24,
        status: 'updatedToday',
        createdDate: '12 Oct 2023',
        iconName: 'Calculator'
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href={`/${lang}/admin/categories`}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Volver a Categorías</span>
                </Link>

                <div className="bg-[#131b2e] rounded-3xl p-8 border border-white/5">
                    <div className="flex items-start gap-6 mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400">
                            {getIcon(category.iconName)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                            <p className="text-slate-400 text-lg">{category.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#0B1120] p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 text-slate-400 mb-2">
                                <Hash className="w-5 h-5" />
                                <span className="text-sm font-medium">Topics</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{category.topicsCount}</p>
                        </div>

                        <div className="bg-[#0B1120] p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 text-slate-400 mb-2">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm font-medium">Status</span>
                            </div>
                            <p className="text-2xl font-bold text-green-400">Updated Today</p>
                        </div>

                        <div className="bg-[#0B1120] p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3 text-slate-400 mb-2">
                                <Calendar className="w-5 h-5" />
                                <span className="text-sm font-medium">Created</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{category.createdDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
