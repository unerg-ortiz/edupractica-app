"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BookOpen,
    Trophy,
    TrendingUp,
    Loader2,
    ChevronRight,
    Calculator,
    Palette,
    Atom,
    Globe,
    Zap,
    Target
} from 'lucide-react';
import { studentService, CategoryProgress } from '@/services/studentService';

const iconMap: Record<string, any> = {
    Calculator,
    Palette,
    Atom,
    Globe,
    BookOpen,
    Zap,
    Target
};

export default function StudentDashboard() {
    const { lang } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        total_categories: 0,
        completed_stages: 0,
        in_progress: 0,
        overall_progress: 0,
        categories_progress: [] as CategoryProgress[]
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        setIsLoading(true);
        try {
            const data = await studentService.getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getIconForCategory = (iconName: string) => {
        const Icon = iconMap[iconName] || BookOpen;
        return Icon;
    };

    const getCategoryColor = (categoryId: number) => {
        const colors = [
            { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
            { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
            { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
            { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
            { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
            { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
        ];
        return colors[(categoryId - 1) % colors.length];
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050511] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                    <p className="text-slate-400 font-medium">Cargando tu panel...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050511] text-white pb-24 lg:pb-8">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight">Mi Panel de Aprendizaje</h1>
                    <p className="text-slate-400 text-lg">Sigue tu progreso y continúa aprendiendo</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Overall Progress */}
                    <div className="bg-[#0F1729] border border-cyan-500/20 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl" />
                        <div className="relative">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-cyan-400" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Progreso General</p>
                            <p className="text-4xl font-black text-white">{stats.overall_progress}%</p>
                        </div>
                    </div>

                    {/* Completed Stages */}
                    <div className="bg-[#0F1729] border border-green-500/20 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl" />
                        <div className="relative">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                                <Trophy className="w-6 h-6 text-green-400" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Etapas Completadas</p>
                            <p className="text-4xl font-black text-white">{stats.completed_stages}</p>
                        </div>
                    </div>

                    {/* In Progress */}
                    <div className="bg-[#0F1729] border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl" />
                        <div className="relative">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-blue-400" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium mb-1">En Progreso</p>
                            <p className="text-4xl font-black text-white">{stats.in_progress}</p>
                        </div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black">Categorías</h2>
                        <span className="text-sm text-slate-500 font-medium">{stats.total_categories} disponibles</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.categories_progress.map((category) => {
                            const Icon = getIconForCategory(category.icon_name);
                            const colors = getCategoryColor(category.id);
                            
                            return (
                                <Link
                                    key={category.id}
                                    href={`/${lang}/student/category/${category.id}`}
                                    className="group bg-[#0F1729] border border-slate-800/50 rounded-3xl p-6 hover:border-slate-700 transition-all relative overflow-hidden"
                                >
                                    {/* Glow Effect */}
                                    <div className={`absolute -top-10 -right-10 w-40 h-40 ${colors.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    
                                    <div className="relative space-y-4">
                                        {/* Icon & Title */}
                                        <div className="flex items-start justify-between">
                                            <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center`}>
                                                <Icon className={`w-7 h-7 ${colors.text}`} />
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                                                {category.description || 'Explora esta categoría'}
                                            </p>
                                        </div>

                                        {/* Progress */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500 font-medium">
                                                    {category.completed_stages}/{category.total_stages} etapas
                                                </span>
                                                <span className={`font-bold ${colors.text}`}>
                                                    {category.progress_percentage}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${colors.text.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
                                                    style={{ width: `${category.progress_percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
