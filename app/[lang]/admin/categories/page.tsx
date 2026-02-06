"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    Search,
    Plus,
    Wand2,
    ChevronRight,
    Calculator,
    ScrollText,
    FlaskConical,
    Globe,
    LayoutGrid,
    BarChart,
    Users,
    Settings,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import clsx from 'clsx';
import { CategoryForm } from '@/components/admin/categories/CategoryForm';
import { Category } from '@/types/schema';

// Mock Data Types
type CategoryStatus = 'updatedToday' | 'noChanges' | 'pendingReview' | 'active';

interface CategoryItem {
    id: string;
    name: string;
    topics: number;
    status: CategoryStatus;
    icon: React.ElementType;
    color: string;
    description?: string;
}

interface DuplicateMatch {
    id: string;
    name1: string;
    name2: string;
}

export default function AdminCategoriesPage() {
    const t = useTranslations('Categories');

    const [isDuplicatesOpen, setIsDuplicatesOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

    // Mock Data mimicking the image
    const duplicates: DuplicateMatch[] = [
        { id: '1', name1: 'Biología', name2: 'Biologia' },
        { id: '2', name1: 'Física I', name2: 'Fisica 1' }
    ];

    const categories: CategoryItem[] = [
        {
            id: '1',
            name: 'Matemáticas Avanzadas',
            topics: 24,
            status: 'updatedToday',
            icon: Calculator,
            color: 'bg-blue-600',
            description: 'Álgebra, cálculo y geometría avanzada'
        },
        {
            id: '2',
            name: 'Historia Universal',
            topics: 12,
            status: 'noChanges',
            icon: ScrollText,
            color: 'bg-amber-600',
            description: 'Historia mundial desde la antigüedad'
        },
        {
            id: '3',
            name: 'Física Cuántica',
            topics: 8,
            status: 'pendingReview',
            icon: FlaskConical,
            color: 'bg-emerald-600',
            description: 'Mecánica cuántica y física moderna'
        },
        {
            id: '4',
            name: 'Literatura Española',
            topics: 15,
            status: 'active',
            icon: Globe,
            color: 'bg-indigo-600',
            description: 'Literatura clásica y contemporánea'
        }
    ];

    const getStatusText = (status: CategoryStatus) => {
        return t(`status.${status}`);
    };

    const handleAddClick = () => {
        setEditingCategory(undefined);
        setIsFormOpen(true);
    };

    const handleEditClick = (cat: CategoryItem) => {
        // Convert CategoryItem to Category for editing
        const categoryData: Category = {
            id: cat.id,
            name: cat.name,
            description: cat.description || '',
            icon: 'BookOpen', // Default, you can map icons properly
            isActive: true
        };
        setEditingCategory(categoryData);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingCategory(undefined);
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-sans pb-24 relative overflow-hidden">
            {/* Background Gradients for 'Premium' feel */}
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/10 blur-[100px] pointer-events-none" />

            <div className="max-w-md mx-auto p-6 relative z-10">
                {/* Header */}
                <header className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-blue-500 font-bold text-xs tracking-wider uppercase mb-1">
                            {t('panelTitle')}
                        </h2>
                        <h1 className="text-4xl font-bold tracking-tight">
                            {t('title')}
                        </h1>
                    </div>
                    <button
                        onClick={handleAddClick}
                        className="bg-blue-600 hover:bg-blue-500 p-3 rounded-full shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                    >
                        <Plus className="w-6 h-6 text-white" />
                    </button>
                </header>

                {/* Search Bar */}
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

                {/* Filters */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm whitespace-nowrap shadow-lg shadow-blue-900/20">
                        {t('filters.all')}
                    </button>
                    {['date', 'topics', 'status'].map((filter) => (
                        <button
                            key={filter}
                            className="bg-[#151b2d] border border-slate-800 text-slate-400 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap flex items-center gap-2 hover:bg-[#1e2538] transition-colors"
                        >
                            {t(`filters.${filter}`)}
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                    ))}
                </div>

                {/* Duplicates Section */}
                <div className="bg-[#0f1629] border border-blue-900/30 rounded-3xl p-5 mb-8 shadow-xl shadow-black/20">
                    <button
                        onClick={() => setIsDuplicatesOpen(!isDuplicatesOpen)}
                        className="w-full flex items-center justify-between mb-4"
                    >
                        <div className="flex items-center gap-3">
                            <Wand2 className="w-5 h-5 text-blue-400" />
                            <div className="text-left">
                                <h3 className="font-bold text-white text-sm">
                                    {t('duplicates.title')}
                                </h3>
                                <p className="text-blue-400 text-xs">
                                    {t('duplicates.count', { count: duplicates.length + 1 })}
                                </p>
                            </div>
                        </div>
                        {isDuplicatesOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                        )}
                    </button>

                    {isDuplicatesOpen && (
                        <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                            {duplicates.map((dup) => (
                                <div key={dup.id} className="flex items-center justify-between p-3 bg-[#131b2e] rounded-xl border border-white/5">
                                    <span className="text-slate-300 text-sm font-medium">
                                        <span className="text-white">{dup.name1}</span> vs <span className="text-slate-400">{dup.name2}</span>
                                    </span>
                                    <button className="text-[10px] font-bold bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition-colors uppercase tracking-wider">
                                        {t('duplicates.merge')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Categories List */}
                <div className="mb-4 flex items-end justify-between">
                    <h3 className="text-xl font-bold text-white">
                        {t('allCategories.title')}
                    </h3>
                    <span className="text-slate-500 text-sm font-medium">
                        {t('allCategories.total', { count: 42 })}
                    </span>
                </div>

                <div className="space-y-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => handleEditClick(cat)}
                            className="group flex items-center gap-4 bg-[#111625] hover:bg-[#161c2e] p-4 rounded-3xl border border-white/5 transition-all cursor-pointer active:scale-[0.98]"
                        >
                            {/* Icon Box */}
                            <div className={clsx(
                                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
                                cat.color
                            )}>
                                <cat.icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-lg truncate mb-1">
                                    {cat.name}
                                </h4>
                                <p className="text-slate-400 text-sm flex items-center gap-1.5 truncate">
                                    <span>{cat.topics} {t('filters.topics')}</span>
                                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                                    <span className={clsx(
                                        "font-medium",
                                        cat.status === 'updatedToday' ? "text-blue-400" :
                                            cat.status === 'active' ? "text-green-400" :
                                                cat.status === 'pendingReview' ? "text-amber-400" :
                                                    "text-slate-500"
                                    )}>
                                        {getStatusText(cat.status)}
                                    </span>
                                </p>
                            </div>

                            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#0B1120]/95 backdrop-blur-md border-t border-white/5 pb-6 pt-4 px-8 z-50">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-1 text-blue-500">
                        <LayoutGrid className="w-6 h-6 fill-current" />
                        <span className="text-[10px] font-bold">Listado</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <BarChart className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Reportes</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <Users className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Usuarios</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <Settings className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Ajustes</span>
                    </div>
                </div>
            </nav>

            {/* Modal Overlay for Form */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl animate-in zoom-in-95 duration-200">
                        <CategoryForm initialData={editingCategory} onClose={handleFormClose} />
                    </div>
                </div>
            )}
        </div>
    );
}
