"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import {
    BookOpen,
    CheckCircle,
    Clock,
    XCircle,
    ArrowRightLeft,
    Plus,
    Edit2,
    Eye,
    BarChart2,
    AlertTriangle,
    ChevronRight,
    Search,
    Filter,
    Calculator,
    Palette,
    Atom,
    BookMarked,
    Users,
    Settings
} from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { analytics, topics, categories, users as usersApi } from '@/lib/api';

interface ProfessorTopic {
    id: number;
    title: string;
    description?: string;
    category_id: number;
    level?: string;
    approval_status: 'published' | 'review' | 'rejected' | 'approved' | 'pending';
    submitted_at: string;
    approval_comment?: string;
    media_url?: string;
    media_type?: string;
}

export default function ProfessorDashboard() {
    const t = useTranslations('Professor');
    const { lang } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [metricsData, setMetricsData] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
    const [topicsList, setTopicsList] = useState<ProfessorTopic[]>([]);
    const [categoryMap, setCategoryMap] = useState<Record<number, string>>({});
    const [user, setUser] = useState<{ full_name?: string } | null>(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            const [summary, myTopics, cats, userData] = await Promise.all([
                analytics.getProfessorSummary().catch(() => ({ approved: 0, pending: 0, rejected: 0, total: 0 })),
                topics.getMyTopics().catch(() => []),
                categories.getAll().catch(() => []),
                usersApi.getMe().catch(() => null)
            ]);

            setMetricsData(summary);
            setTopicsList(myTopics);
            setUser(userData);

            const catMap: Record<number, string> = {};
            if (Array.isArray(cats)) {
                cats.forEach((c: any) => catMap[c.id] = c.name);
            }
            setCategoryMap(catMap);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const metrics = [
        { label: t('metrics.total'), value: metricsData.total, icon: BookOpen, color: 'text-slate-400', bg: 'bg-slate-400/5' },
        { label: t('metrics.approved'), value: metricsData.approved, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/5', border: 'border-green-500/10' },
        { label: t('metrics.pending'), value: metricsData.pending, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500/10' },
        { label: 'Total Alumnos', value: (metricsData as any).total_students || 0, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-400/5', border: 'border-indigo-400/10' },
    ];

    const getStatusType = (status: string) => {
        if (status === 'approved') return 'published';
        if (status === 'pending') return 'review';
        return 'rejected';
    };

    const getTopicIcon = (categoryId: number) => {
        const icons: Record<number, any> = {
            1: Calculator,
            2: Palette,
            3: Atom,
            4: BookMarked
        };
        return icons[categoryId] || BookMarked;
    };

    const getTopicColor = (categoryId: number) => {
        const colors: Record<number, string> = {
            1: 'text-blue-500',
            2: 'text-purple-500',
            3: 'text-orange-500',
            4: 'text-pink-500'
        };
        return colors[categoryId] || 'text-blue-500';
    };

    const getTopicBg = (categoryId: number) => {
        const bgs: Record<number, string> = {
            1: 'bg-blue-500/10',
            2: 'bg-purple-500/10',
            3: 'bg-orange-500/10',
            4: 'bg-pink-500/10'
        };
        return bgs[categoryId] || 'bg-blue-500/10';
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'Reciente';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#080C14] flex flex-col items-center justify-center p-8 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 font-bold animate-pulse tracking-widest uppercase text-xs">Preparando Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080C14] text-white selection:bg-blue-500/30 p-6 lg:p-12 pb-32">
            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full ring-2 ring-blue-500/30 p-0.5 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black">
                            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'P'}
                        </div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-bold leading-none mb-1">{t('welcome')}</p>
                            <p className="text-white font-black text-lg leading-none">{user?.full_name || 'Profesor'}</p>
                        </div>
                    </div>
                    <Link
                        href={`/${lang}/profile`}
                        className="w-10 h-10 bg-[#0F172A] border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                    </Link>
                </header>

                {/* Desktop Header */}
                <header className="hidden lg:flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white/95">
                            {t('title')}
                        </h1>
                        <p className="text-slate-400 text-base font-medium">
                            {t('subtitle')}
                        </p>
                    </div>
                    <Link
                        href={`/${lang}/professor/content-transfer/initiate`}
                        className="flex items-center gap-2 bg-[#111827]/80 border border-white/5 px-6 py-3.5 rounded-2xl font-black text-slate-200 hover:text-white hover:bg-[#1E293B] hover:border-white/10 transition-all shadow-xl group shadow-black/20 text-sm"
                    >
                        <ArrowRightLeft className="w-4 h-4 text-blue-500 transition-transform group-hover:rotate-12" />
                        {t('nav.transferButton')}
                    </Link>
                </header>

                {/* Mobile Transfer Button (Below Subtitle) */}
                <Link
                    href={`/${lang}/professor/content-transfer/initiate`}
                    className="lg:hidden w-full flex items-center justify-center gap-2 bg-[#0F172A] border border-white/10 px-5 py-4 rounded-xl font-bold text-slate-200 text-sm"
                >
                    <ArrowRightLeft className="w-4 h-4 text-blue-500" />
                    {t('nav.transferButton')}
                </Link>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {metrics.map((metric, i) => (
                        <div
                            key={i}
                            className={clsx(
                                "p-6 rounded-3xl border bg-[#0F172A]/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] hover:border-white/10 group",
                                metric.border || "border-white/5"
                            )}
                        >
                            <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-500", metric.bg)}>
                                <metric.icon className={clsx("w-5 h-5", metric.color)} />
                            </div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 opacity-80 group-hover:opacity-100 transition-opacity">{metric.label}</p>
                            <p className="text-white text-2xl lg:text-3xl font-black tracking-tighter">{metric.value}</p>
                        </div>
                    ))}
                </div>

                {/* Content Section Header */}
                <div className="flex items-center justify-between pt-2">
                    <h2 className="text-xl font-black tracking-tight">{t('content.title')}</h2>
                    <button className="text-blue-500 text-[10px] font-black hover:text-blue-400 transition-colors uppercase tracking-widest">
                        {t('content.viewAll')}
                    </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {topicsList.map((topic) => {
                        const statusType = getStatusType(topic.approval_status);
                        const Icon = getTopicIcon(topic.category_id);
                        const color = getTopicColor(topic.category_id);
                        const bg = getTopicBg(topic.category_id);

                        return (
                            <div
                                key={topic.id}
                                className="bg-[#0F172A]/60 backdrop-blur-md rounded-3xl border border-white/5 p-6 lg:p-7 space-y-6 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-700 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] hover:-translate-y-0.5"
                            >
                                {/* Decorative Background for Card */}
                                <div className={clsx("absolute -top-24 -right-24 w-64 h-64 blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700", bg)} />

                                {/* Card Header */}
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className={clsx(
                                                "px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-lg shadow-black/20",
                                                statusType === 'published' ? "bg-green-500/10 text-green-500" :
                                                    statusType === 'review' ? "bg-blue-600/10 text-blue-400" :
                                                        "bg-red-500/10 text-red-500"
                                            )}>
                                                <div className={clsx(
                                                    "w-1 h-1 rounded-full",
                                                    statusType === 'published' ? "bg-green-500" :
                                                        statusType === 'review' ? "bg-blue-400 animate-pulse" :
                                                            "bg-red-500 animate-ping"
                                                )} />
                                                {t(`content.status.${statusType}`)}
                                            </span>
                                            <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest opacity-60">
                                                • {t('content.lastUpdate', { time: formatDate(topic.submitted_at) })}
                                            </span>
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-black text-white leading-tight group-hover:text-blue-400 transition-colors duration-300">
                                            {topic.title}
                                        </h3>
                                        <p className="text-slate-400 font-bold text-xs lg:text-sm flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                                            {categoryMap[topic.category_id] || `Categoría ${topic.category_id}`} • <span className="text-slate-500">{topic.level || 'Secundaria'}</span>
                                        </p>
                                    </div>
                                    <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6", bg)}>
                                        <Icon className={clsx("w-5 h-5", color)} />
                                    </div>
                                </div>

                                {/* Avatars & Actions */}
                                <div className="pt-5 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-white/5">
                                    {statusType === 'published' && (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <div className="flex -space-x-2.5">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0F172A] bg-slate-800 overflow-hidden shadow-2xl relative group-hover:scale-105 transition-transform">
                                                            <img src={`https://i.pravatar.cc/100?u=${topic.id}-${i}`} alt="Student" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                    <div className="w-9 h-9 rounded-full border-2 border-[#0F172A] bg-[#1E293B] flex items-center justify-center text-[9px] font-black text-blue-400 shadow-2xl">
                                                        +0
                                                    </div>
                                                </div>
                                                <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest hidden sm:block">Alumnos</span>
                                            </div>
                                            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                                                <button
                                                    onClick={() => router.push(`/${lang}/professor/topics/create?id=${topic.id}`)}
                                                    className="flex-1 sm:flex-none w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-white/10 active:scale-95 shadow-lg"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/${lang}/professor/analytics?topicId=${topic.id}`)}
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600/10 border border-blue-500/10 px-5 py-2.5 rounded-xl text-blue-400 font-black text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-600/0 hover:shadow-blue-600/20 active:scale-95 uppercase tracking-widest leading-none h-10"
                                                >
                                                    <BarChart2 className="w-4 h-4" />
                                                    {t('content.actions.progress')}
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {statusType === 'review' && (
                                        <>
                                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest opacity-60">Pendiente de Revisión</p>
                                            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                                                <button
                                                    onClick={() => router.push(`/${lang}/professor/topics/create?id=${topic.id}`)}
                                                    className="flex-1 sm:flex-none w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-white/10 active:scale-95 shadow-lg"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/${lang}/professor/topics/create?id=${topic.id}&view=true`)}
                                                    className="flex-1 sm:flex-none w-10 h-10 bg-[#111827] border border-white/5 rounded-xl flex items-center justify-center text-blue-500 hover:text-white hover:bg-blue-600 transition-all active:scale-95 shadow-lg"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {statusType === 'rejected' && (
                                        <>
                                            <div className="flex items-center gap-2 text-red-500 font-black text-[9px] uppercase tracking-widest bg-red-500/5 px-3 py-1.5 rounded-lg border border-red-500/10">
                                                <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                                                <span>{topic.approval_comment || 'Contenido rechazado'}</span>
                                            </div>
                                            <button
                                                onClick={() => router.push(`/${lang}/professor/topics/create?id=${topic.id}&fix=true`)}
                                                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-black text-[10px] transition-all shadow-xl shadow-red-600/20 uppercase tracking-widest active:scale-95 leading-none h-10"
                                            >
                                                {t('content.actions.fix')}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {topicsList.length === 0 && (
                    <div className="py-20 text-center space-y-4 bg-white/5 rounded-[40px] border border-white/5">
                        <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-blue-500 opacity-50" />
                        </div>
                        <h3 className="text-2xl font-black text-white/50">Aún no has creado temas</h3>
                        <p className="text-slate-600 max-w-sm mx-auto font-bold uppercase tracking-widest text-[10px]">Empieza a compartir tu conocimiento creando tu primer tema educativo.</p>
                    </div>
                )}
            </div>

            {/* Create FAB */}
            <button
                onClick={() => router.push(`/${lang}/professor/topics/create`)}
                className="fixed bottom-24 lg:bottom-10 right-6 lg:right-10 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-full shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group z-50"
            >
                <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-90">
                    <Plus className="w-4 h-4" />
                </div>
                <span className="font-black text-sm tracking-tight">{t('nav.createButton')}</span>
            </button>
        </div>
    );
}
