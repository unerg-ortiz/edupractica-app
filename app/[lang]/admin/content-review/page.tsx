"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
    Search,
    Filter,
    Play,
    Clock,
    ChevronRight,
    LayoutGrid,
    List,
    Loader2,
    AlertTriangle,
    Inbox
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { contentReview, categories as categoriesApi } from '@/lib/api';

interface PendingTopic {
    id: number;
    title: string;
    description: string | null;
    category_id: number;
    professor_id: number | null;
    professor_name: string | null;
    approval_status: string;
    submitted_at: string | null;
    media_url: string | null;
    media_type: string | null;
    stages?: Array<{
        id: number;
        title: string;
        order: number;
        media_url?: string | null;
        media_type?: string | null;
    }>;
}

interface CategoryMap {
    [key: number]: string;
}

export default function ContentReviewDashboard() {
    const t = useTranslations('ContentReview');
    const { lang } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [pendingTopics, setPendingTopics] = useState<PendingTopic[]>([]);
    const [categoryNames, setCategoryNames] = useState<CategoryMap>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        loadPendingContent();
    }, []);

    // Close filters dropdown when clicking outside
    useEffect(() => {
        if (!showFilters) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Only close if click is outside the filter container
            if (!target.closest('.filter-dropdown-container')) {
                console.log('Closing filter dropdown - click outside');
                setShowFilters(false);
            }
        };

        const timeoutId = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilters]);

    const loadPendingContent = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [stages, cats] = await Promise.all([
                contentReview.getPending(),
                categoriesApi.getAll().catch(() => []),
            ]);

            console.log('Pending topics received:', stages);
            setPendingTopics(stages);
            console.log('Pending topics loaded:', stages.length, 'Category IDs:', stages.map((s: any) => s.category_id));

            // Build category name map
            const catMap: CategoryMap = {};
            if (Array.isArray(cats)) {
                cats.forEach((cat: any) => {
                    catMap[cat.id] = cat.name;
                });
            }
            setCategoryNames(catMap);
            console.log('Categories loaded:', catMap);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredTopics = pendingTopics.filter(topic => {
        const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (topic.description || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === null || topic.category_id === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Debug logs
    console.log('Filter State:', { selectedCategory, pendingTopicsCount: pendingTopics.length, filteredCount: filteredTopics.length });

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours < 1) return 'Hace unos minutos';
        if (diffHours < 24) return `Hace ${diffHours} horas`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return 'Ayer';
        return `Hace ${diffDays} días`;
    };

    // Placeholder thumbnails based on category
    const getThumbnail = (categoryId: number) => {
        const thumbnails: Record<number, string> = {
            1: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
            2: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
            3: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2121&auto=format&fit=crop",
        };
        return thumbnails[categoryId] || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop";
    };

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
                                {!isLoading && (
                                    <span className="ml-2 text-blue-400 font-bold">
                                        ({pendingTopics.length} pendientes)
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 rounded-xl transition-all ${
                                    viewMode === 'grid' 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                        : 'text-slate-500 hover:text-white'
                                }`}
                            >
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 rounded-xl transition-all ${
                                    viewMode === 'list' 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                        : 'text-slate-500 hover:text-white'
                                }`}
                            >
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
                            placeholder="Buscar por título o descripción..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#111827]/80 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all font-semibold"
                        />
                    </div>
                    <div className="relative filter-dropdown-container">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Toggle filters, current state:', showFilters);
                                setShowFilters(!showFilters);
                            }}
                            className={`flex items-center justify-center gap-3 bg-[#111827]/80 border px-8 py-5 rounded-2xl font-black transition-all ${
                                showFilters || selectedCategory !== null
                                    ? 'border-blue-500/30 text-blue-400 hover:bg-[#1E293B]'
                                    : 'border-white/5 text-slate-400 hover:text-white hover:bg-[#1E293B]'
                            }`}
                        >
                            <Filter className="w-5 h-5" />
                            <span>Filtros</span>
                            {selectedCategory !== null && (
                                <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">1</span>
                            )}
                        </button>
                        
                        {showFilters && (
                            <div className="absolute top-full mt-2 right-0 bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl z-50 min-w-[250px] p-3">
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 py-1">
                                        Categoría ({Object.keys(categoryNames).length} disponibles)
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Clearing category filter');
                                            setSelectedCategory(null);
                                            setShowFilters(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            selectedCategory === null
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-300 hover:bg-white/5'
                                        }`}
                                    >
                                        Todas las categorías
                                    </button>
                                    {Object.keys(categoryNames).length === 0 && (
                                        <div className="px-3 py-4 text-center text-slate-500 text-xs">
                                            No hay categorías disponibles
                                        </div>
                                    )}
                                    {Object.entries(categoryNames).map(([id, name]) => (
                                        <button
                                            key={id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Selected category:', id, name);
                                                setSelectedCategory(Number(id));
                                                setShowFilters(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                selectedCategory === Number(id)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-slate-300 hover:bg-white/5'
                                            }`}
                                        >
                                            {name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="py-32 flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        <p className="text-slate-400 font-medium">Cargando temas pendientes...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white/50">Error al cargar</h3>
                        <p className="text-slate-500 text-center max-w-md">{error}</p>
                        <button
                            onClick={loadPendingContent}
                            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Content Grid/List */}
                {!isLoading && !error && (
                    <>
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                            : "flex flex-col gap-4"
                        }>
                            {filteredTopics.map((topic) => (
                                <Link
                                    key={topic.id}
                                    href={`/${lang}/admin/content-review/${topic.id}`}
                                    className={`group relative bg-[#0F172A] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] duration-500 ${
                                        viewMode === 'grid'
                                            ? 'rounded-[36px] hover:-translate-y-2'
                                            : 'rounded-2xl flex flex-row items-center hover:translate-x-2'
                                    }`}
                                >
                                    {/* Thumbnail */}
                                    <div className={`relative overflow-hidden ${
                                        viewMode === 'grid' ? 'aspect-[4/3]' : 'w-48 h-32 flex-shrink-0'
                                    }`}>
                                        <img
                                            src={topic.media_url || getThumbnail(topic.category_id)}
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
                                    <div className={viewMode === 'grid' ? 'p-8 space-y-4' : 'p-6 flex-1 space-y-3'}>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                                                {categoryNames[topic.category_id] || `Categoría ${topic.category_id}`}
                                            </span>
                                            <h3 className="text-xl font-black text-white leading-tight group-hover:text-blue-400 transition-colors">
                                                {topic.title}
                                            </h3>
                                        </div>

                                        <div className="pt-2 flex items-center justify-between border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10" />
                                                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 transition-colors">
                                                    {topic.professor_name || `Profesor #${topic.professor_id || '?'}`}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-600">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {topic.media_type || 'Contenido'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 flex items-center justify-between">
                                            <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                                                <ChevronRight className="w-3 h-3 text-blue-500" />
                                                {formatDate(topic.submitted_at)}
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
                                    {searchQuery ? (
                                        <Search className="w-10 h-10 text-slate-700" />
                                    ) : (
                                        <Inbox className="w-10 h-10 text-slate-700" />
                                    )}
                                </div>
                                <h3 className="text-2xl font-black text-white/50">
                                    {searchQuery ? 'No se encontraron temas' : '¡Todo revisado!'}
                                </h3>
                                <p className="text-slate-600">
                                    {searchQuery
                                        ? 'Prueba con otros términos de búsqueda.'
                                        : 'No hay temas pendientes de aprobación en este momento.'}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
