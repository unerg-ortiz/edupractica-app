"use client";

import React, { useState, use } from 'react';
import { useTranslations } from 'next-intl';
import {
    Search,
    Plus,
    Wand2,
    ChevronRight,
    LayoutGrid,
    BarChart,
    Users,
    Settings,
    ChevronDown,
    ChevronUp,
    AppWindow,
    BookOpen
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { iconMap } from '@/components/admin/categories/iconMap';

// Enhanced UI Category Type for View
type CategoryStatus = 'updatedToday' | 'noChanges' | 'pendingReview' | 'active';

interface CategoryUI {
    id: string;
    name: string;
    topics: number;
    status: CategoryStatus;
    createdDate: string;
    iconName: string; // Store string key for iconMap
    color: string;
    iconColor: string;
}

interface DuplicateMatch {
    id: string;
    name1: string;
    name2: string;
}

export default function AdminCategoriesPage({ params }: { params: Promise<{ lang: string }> }) {
    const t = useTranslations('Categories');
    const { lang } = use(params);

    const [isDuplicatesOpen, setIsDuplicatesOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const duplicates: DuplicateMatch[] = [
        { id: '1', name1: 'Biología', name2: 'Biologia' },
        { id: '2', name1: 'Física I', name2: 'Fisica 1' }
    ];

    const categories: CategoryUI[] = [
        {
            id: '1',
            name: 'Matemáticas Avanzadas',
            topics: 24,
            status: 'updatedToday',
            createdDate: '12 Oct 2023',
            iconName: 'Calculator',
            color: 'bg-indigo-500/10',
            iconColor: 'text-indigo-400'
        },
        {
            id: '2',
            name: 'Historia Universal',
            topics: 12,
            status: 'noChanges',
            createdDate: '05 Nov 2023',
            iconName: 'ScrollText', // Assuming this exists in iconMap or fallback
            color: 'bg-orange-500/10',
            iconColor: 'text-orange-400'
        },
        {
            id: '3',
            name: 'Física Cuántica',
            topics: 8,
            status: 'pendingReview',
            createdDate: '18 Nov 2023',
            iconName: 'FlaskConical',
            color: 'bg-emerald-500/10',
            iconColor: 'text-emerald-400'
        },
        {
            id: '4',
            name: 'Literatura Española',
            topics: 15,
            status: 'active',
            createdDate: '02 Dec 2023',
            iconName: 'Globe',
            color: 'bg-purple-500/10',
            iconColor: 'text-purple-400'
        }
    ];

    const getStatusText = (status: CategoryStatus) => {
        return t(`status.${status}`);
    };

    const getStatusColor = (status: CategoryStatus) => {
        switch (status) {
            case 'updatedToday': return 'text-green-400';
            case 'noChanges': return 'text-slate-400';
            case 'pendingReview': return 'text-amber-400';
            case 'active': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };

    const renderIcon = (iconName: string, className?: string) => {
        const IconComponent = iconMap[iconName] || BookOpen;
        return <IconComponent className={className} />;
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-sans flex overflow-hidden">

            {/* Sidebar - Desktop */}
            <aside className="w-64 bg-[#0B1120] border-r border-white/5 flex-col hidden md:flex sticky top-0 h-screen z-20">
                <div className="p-6">
                    <Link href={`/${lang}/admin`} className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
                        <LayoutGrid className="w-8 h-8 text-blue-500 fill-blue-500/20" />
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                            EduAdmin
                        </span>
                    </Link>

                    <nav className="space-y-2">
                        <NavItem href={`/${lang}/admin`} icon={LayoutGrid} label="Panel" />
                        <NavItem href={`/${lang}/admin/categories`} icon={AppWindow} label="Categorías" active />
                        <NavItem href={`/${lang}/admin/users`} icon={Users} label="Usuarios" />
                        <NavItem href={`/${lang}/admin/reports`} icon={BarChart} label="Reportes" />
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/5">
                    <nav className="space-y-2 mb-6">
                        <NavItem href={`/${lang}/admin/settings`} icon={Settings} label="Ajustes" />
                    </nav>

                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-white/10">
                            <Users className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">Admin User</span>
                            <span className="text-xs text-slate-500">admin@example.com</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative scrollbar-hide h-screen">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] pointer-events-none rounded-full" />

                <div className="max-w-5xl mx-auto p-4 md:p-8 relative z-10 pb-20 md:pb-8">
                    {/* Header */}
                    <header className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-blue-500 font-bold text-xs tracking-[0.2em] uppercase mb-2">
                                {t('panelTitle')}
                            </h2>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white/95">
                                {t('title')}
                            </h1>
                        </div>
                        <Link
                            href={`/${lang}/admin/categories/new`}
                            className="bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 group"
                        >
                            <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                        </Link>
                    </header>

                    {/* Search Bar */}
                    <div className="relative mb-8 group">
                        <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-xl group-hover:bg-blue-500/10 transition-all" />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#131b2e]/80 backdrop-blur-sm border border-white/5 rounded-2xl py-4 pl-16 pr-6 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all font-medium text-sm shadow-sm relative z-10"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-blue-900/20 flex items-center gap-2 hover:bg-blue-500 transition-colors">
                            {t('filters.all')}
                            <ChevronDown className="w-3 h-3 opacity-80" />
                        </button>
                        {['date', 'topics', 'status'].map((filter) => (
                            <button
                                key={filter}
                                className="bg-[#131b2e] border border-white/5 hover:border-white/10 text-slate-400 px-6 py-2.5 rounded-full font-medium text-xs flex items-center gap-2 hover:bg-[#1e2538] hover:text-slate-300 transition-all"
                            >
                                {t(`filters.${filter}`)}
                                {filter === 'status' ? (
                                    <span className="text-[10px] ml-1">▼</span>
                                ) : filter === 'topics' ? (
                                    <ChevronDown className="w-3 h-3 opacity-60 ml-1" />
                                ) : (
                                    <ChevronUp className="w-3 h-3 opacity-60 ml-1" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Duplicates Section */}
                    <div className="bg-[#111927] relative overflow-hidden border border-blue-900/30 rounded-3xl p-6 mb-10 shadow-xl shadow-black/20 group hover:border-blue-900/50 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <button
                                onClick={() => setIsDuplicatesOpen(!isDuplicatesOpen)}
                                className="w-full flex items-center justify-between mb-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                                        <Wand2 className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-white text-base">
                                            {t('duplicates.title')}
                                        </h3>
                                        <p className="text-blue-400 text-xs font-medium mt-0.5">
                                            {t('duplicates.count', { count: 3 })}
                                        </p>
                                    </div>
                                </div>
                                <div className={clsx(
                                    "w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center transition-transform duration-300",
                                    isDuplicatesOpen && "rotate-180"
                                )}>
                                    <ChevronUp className="w-4 h-4 text-slate-400" />
                                </div>
                            </button>

                            <div className={clsx(
                                "space-y-3 transition-all duration-300 ease-in-out overflow-hidden",
                                isDuplicatesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            )}>
                                {duplicates.map((dup) => (
                                    <div key={dup.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0B1120]/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors gap-3 sm:gap-0">
                                        <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                                            <span className="text-white font-bold">{dup.name1}</span>
                                            <span className="text-slate-500 text-xs uppercase tracking-wider px-2 py-0.5 bg-white/5 rounded">vs</span>
                                            <span className="text-white">{dup.name2}</span>
                                        </div>
                                        <button className="text-[10px] font-bold text-blue-400 px-4 py-2 rounded-lg bg-blue-500/5 hover:bg-blue-500/15 border border-blue-500/10 hover:border-blue-500/30 transition-all uppercase tracking-widest w-full sm:w-auto">
                                            {t('duplicates.merge')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="mb-6 flex items-end justify-between px-1">
                        <h3 className="text-lg font-bold text-white">
                            {t('allCategories.title')}
                        </h3>
                        <span className="text-slate-500 text-xs font-medium">
                            {t('allCategories.total', { count: 42 })}
                        </span>
                    </div>

                    <div className="space-y-4 mb-8">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/${lang}/admin/categories/${cat.id}`}
                                className="group flex items-center justify-between bg-[#131b2e] hover:bg-[#161c2e] p-4 md:p-5 rounded-3xl border border-white/5 hover:border-white/10 transition-all cursor-pointer shadow-sm hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
                            >
                                <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
                                    {/* Icon Box */}
                                    <div className={clsx(
                                        "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0",
                                        cat.color,
                                        cat.iconColor || "text-white"
                                    )}>
                                        {renderIcon(cat.iconName, "w-6 h-6 md:w-7 md:h-7")}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-white text-base mb-1.5 truncate">
                                            {cat.name}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs flex-wrap">
                                            <span className="text-slate-400 font-medium whitespace-nowrap">{cat.topics} {t('filters.topics')}</span>
                                            <span className="text-slate-600 hidden sm:inline">•</span>
                                            <span className={clsx(
                                                "font-medium truncate",
                                                getStatusColor(cat.status)
                                            )}>
                                                {getStatusText(cat.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 md:gap-8 shrink-0 ml-2">
                                    <div className="text-right hidden sm:block">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">CREADO</span>
                                        <span className="text-xs font-bold text-slate-200">{cat.createdDate}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="flex justify-center pb-8">
                        <button className="bg-[#131b2e] hover:bg-[#1e2538] text-slate-300 font-medium text-sm py-3 px-6 rounded-xl border border-white/5 transition-all flex items-center gap-2 hover:text-white group">
                            Cargar más categorías
                            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-[#0B1120]/95 backdrop-blur-md border-t border-white/5 pb-6 pt-4 px-6 z-50 md:hidden">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <Link href={`/${lang}/admin`} className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <LayoutGrid className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Panel</span>
                    </Link>
                    <Link href={`/${lang}/admin/categories`} className="flex flex-col items-center gap-1 text-blue-500">
                        <AppWindow className="w-6 h-6 fill-current/20" />
                        <span className="text-[10px] font-bold">Categorías</span>
                    </Link>
                    <Link href={`/${lang}/admin/users`} className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <Users className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Usuarios</span>
                    </Link>
                    <Link href={`/${lang}/admin/settings`} className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
                        <Settings className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Ajustes</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}

// Fixed NavItem Component
interface NavItemProps {
    href: string;
    icon: React.ElementType; // Better typing than 'any'
    label: string;
    active?: boolean;
}

function NavItem({ icon: Icon, label, active = false, href }: NavItemProps) {
    return (
        <Link
            href={href}
            className={clsx(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium text-sm group",
                active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            )}
        >
            <Icon className={clsx(
                "w-5 h-5 transition-colors",
                active ? "text-white" : "text-slate-500 group-hover:text-slate-300"
            )} />
            <span>{label}</span>
        </Link>
    );
}
