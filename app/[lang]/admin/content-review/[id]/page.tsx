"use client";

import React, { useState, useEffect } from 'react';
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
    Calendar,
    Loader2,
    AlertTriangle
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { contentReview, categories as categoriesApi } from '@/lib/api';

interface TopicDetail {
    id: number;
    title: string;
    description: string | null;
    category_id: number;
    professor_id: number | null;
    approval_status: string;
    submitted_at: string | null;
    stages: any[];
}

export default function ContentReviewPage() {
    const t = useTranslations('ContentReview');
    const { id, lang } = useParams();
    const router = useRouter();
    const [adminNotes, setAdminNotes] = useState('');
    const [topic, setTopic] = useState<TopicDetail | null>(null);
    const [selectedStage, setSelectedStage] = useState<any>(null);
    const [categoryName, setCategoryName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadStageDetails();
        }
    }, [id]);

    const loadStageDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const stageId = Number(id);
            console.log('Loading topic details for ID:', stageId);
            if (isNaN(stageId)) throw new Error("Invalid ID");

            const data = await contentReview.getTopic(stageId);
            console.log('Topic data received:', data);
            setTopic(data);
            if (data.stages && data.stages.length > 0) {
                console.log('Setting selected stage to first stage:', data.stages[0]);
                setSelectedStage(data.stages[0]);
            } else {
                console.warn('No stages found in topic');
            }

            // Fetch category name
            if (data.category_id) {
                try {
                    const cat = await categoriesApi.get(data.category_id);
                    console.log('Category loaded:', cat);
                    setCategoryName(cat.name);
                } catch (e) {
                    console.error("Error fetching category", e);
                }
            }
        } catch (err: any) {
            console.error('Error loading topic details:', err);
            setError(err.message || 'Error loading content');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReview = async (approved: boolean) => {
        if (!topic) return;
        setIsSubmitting(true);
        try {
            console.log('Submitting review:', { topicId: topic.id, approved, notes: adminNotes });
            await contentReview.review(topic.id, approved, adminNotes);
            console.log('Review submitted successfully');
            // Redirect back to dashboard on success
            router.push(`/${lang}/admin/content-review`);
        } catch (err: any) {
            console.error('Error submitting review:', err);
            alert(`Error: ${err.message}`);
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString(lang as string, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Placeholder thumbnails based on category (same as listing page)
    const getThumbnail = (categoryId: number) => {
        const thumbnails: Record<number, string> = {
            1: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
            2: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
            3: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2121&auto=format&fit=crop",
        };
        return thumbnails[categoryId] || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop";
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-slate-400">Cargando detalles...</p>
                </div>
            </div>
        );
    }

    if (error || !topic) {
        return (
            <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                    <h1 className="text-2xl font-bold text-white">Error</h1>
                    <p className="text-slate-400">{error || 'Stage not found'}</p>
                    <Link href={`/${lang}/admin/content-review`} className="text-blue-500 hover:underline">
                        Volver al Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080C14] text-white selection:bg-blue-500/30 font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#080C14]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href={`/${lang}/admin/content-review`} className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors group">
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold tracking-tight text-white/90">
                                {topic.title}
                            </h1>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-black">
                                {t('subtitle') || 'REVISIÓN DE TEMA'}
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col items-end opacity-60">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-300">
                            {t('panelTitle') || 'PANEL DE ADMINISTRACIÓN'}
                        </p>
                        <p className="text-[10px] font-bold">
                            {formatDate(topic.submitted_at)}
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
                        {/* Video Player / Media Preview */}
                        <div className="relative aspect-video rounded-[32px] overflow-hidden bg-slate-900 shadow-2xl group border border-white/10">
                            {selectedStage?.media_url || topic?.category_id ? (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <p className="text-slate-400 text-sm font-medium">Vista previa de medio: {selectedStage?.media_type || 'Imagen'}</p>
                                    </div>
                                    <img
                                        src={selectedStage?.media_url || getThumbnail(topic?.category_id || 0)}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                                        onError={(e) => {
                                            // If image fails to load, use category thumbnail
                                            const imgElement = e.currentTarget;
                                            if (imgElement.src !== getThumbnail(topic?.category_id || 0)) {
                                                imgElement.src = getThumbnail(topic?.category_id || 0);
                                            }
                                        }}
                                    />
                                    {/* Play Button Mock */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-20 h-20 bg-blue-600/80 rounded-full flex items-center justify-center shadow-lg">
                                            <Play className="w-8 h-8 fill-white text-white ml-1" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                                    <FileText className="w-16 h-16 mb-4 opacity-50" />
                                    <span>Sin contenido multimedia adjunto</span>
                                </div>
                            )}
                        </div>

                        {/* Badges & Title */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <span className="bg-[#1E293B] px-3 py-1.5 rounded-md text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                                    {categoryName || `CAT #${topic.category_id}`}
                                </span>
                                <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Enviado: {formatDate(topic.submitted_at)}
                                </div>
                            </div>

                            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                                {topic.title}
                            </h2>

                            <div className="flex flex-wrap gap-4">
                                <div className="bg-[#111827] border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#1F2937] transition-colors cursor-default">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-300">
                                        {topic.professor_name || `Profesor #${topic.professor_id || '?'}`}
                                    </span>
                                </div>
                                <div className="bg-[#111827] border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 hover:bg-[#1F2937] transition-colors cursor-default">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-300">
                                        {topic.stages.length} Etapas
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]" />
                                <h3 className="text-2xl font-black tracking-tight text-white/95">Descripción</h3>
                            </div>
                            <p className="text-xl text-slate-400 leading-relaxed font-medium">
                                {topic.description || "Sin descripción proporcionada."}
                            </p>
                        </div>

                        {/* Stages Selection */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-8 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)]" />
                                    <h3 className="text-2xl font-black tracking-tight text-white/95">Etapas del Tema</h3>
                                </div>
                                <span className="text-slate-500 text-sm font-bold">{topic.stages?.length || 0} etapas registradas</span>
                            </div>

                            {topic.stages && topic.stages.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {topic.stages.map((st: any) => (
                                    <button
                                        key={st.id}
                                        onClick={() => setSelectedStage(st)}
                                        className={clsx(
                                            "flex items-center justify-between p-6 rounded-3xl border transition-all text-left group",
                                            selectedStage?.id === st.id
                                                ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]"
                                                : "bg-[#111827] border-white/5 hover:border-white/10"
                                        )}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={clsx(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-colors",
                                                selectedStage?.id === st.id ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-500"
                                            )}>
                                                {st.order}
                                            </div>
                                            <div>
                                                <h4 className={clsx(
                                                    "font-bold text-lg transition-colors",
                                                    selectedStage?.id === st.id ? "text-blue-400" : "text-slate-200"
                                                )}>
                                                    {st.title}
                                                </h4>
                                                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">{st.media_type || 'Texto'}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className={clsx(
                                            "w-5 h-5 transition-transform group-hover:translate-x-1",
                                            selectedStage?.id === st.id ? "text-blue-500" : "text-slate-700"
                                        )} />
                                    </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-[#111827] border border-yellow-500/20 rounded-3xl p-8 text-center">
                                    <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <AlertTriangle className="w-8 h-8 text-yellow-500" />
                                    </div>
                                    <h4 className="text-lg font-bold text-yellow-400 mb-2">Sin Etapas Registradas</h4>
                                    <p className="text-slate-400 text-sm">Este tema no tiene etapas asociadas todavía.</p>
                                </div>
                            )}
                        </div>

                        {/* Selected Stage Content */}
                        {selectedStage && (
                            <div className="space-y-6 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-8 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.3)]" />
                                    <h3 className="text-2xl font-black tracking-tight text-white/95">
                                        Contenido: {selectedStage.title}
                                    </h3>
                                </div>
                                <div className="bg-[#111827] p-10 rounded-[40px] border border-white/5 text-slate-300 leading-relaxed text-lg font-medium shadow-inner relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                        <FileText className="w-24 h-24" />
                                    </div>
                                    {selectedStage.content ? (
                                        <div 
                                            className="rich-content"
                                            dangerouslySetInnerHTML={{ __html: selectedStage.content }} 
                                        />
                                    ) : (
                                        <p className="text-slate-500 italic">Sin contenido de texto.</p>
                                    )}

                                    {selectedStage.challenge_description && (
                                        <div className="mt-10 p-8 bg-blue-500/5 rounded-3xl border border-blue-500/10">
                                            <h5 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">Desafío / Aplicación</h5>
                                            <p className="text-slate-400 italic">{selectedStage.challenge_description}</p>
                                        </div>
                                    )}

                                    {/* Multiple Media Files List */}
                                    {selectedStage.media_files && selectedStage.media_files.length > 0 && (
                                        <div className="mt-10 space-y-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-1 h-4 bg-blue-500 rounded-full" />
                                                <h5 className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Material Adjunto ({selectedStage.media_files.length})</h5>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {selectedStage.media_files.map((file: any, idx: number) => (
                                                    <a
                                                        key={idx}
                                                        href={file.url.startsWith('http') ? file.url : `http://localhost:8000/${file.url}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-blue-500/20 transition-all group"
                                                    >
                                                        <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                                                            {file.type === 'video' ? <Play className="w-4 h-4 text-blue-400" /> : <FileText className="w-4 h-4 text-blue-400" />}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-0.5">{file.type}</p>
                                                            <p className="text-xs font-bold text-slate-300 truncate group-hover:text-white transition-colors">{file.filename || 'Ver Material'}</p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Steps & Admin Input */}
                    <div className="lg:col-span-5 space-y-12">
                        {/* Admin Notes Section */}
                        <section className="bg-[#111827]/80 backdrop-blur-xl rounded-[44px] border border-blue-500/10 p-10 space-y-8 shadow-2xl sticky top-32">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-blue-500/10 rounded-xl">
                                    <MessageSquare className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400/80">
                                    {t('adminNotes.title') || 'NOTAS ADMINISTRATIVAS'}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                <textarea
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder={t('adminNotes.placeholder') || "Añadir comentarios de retroalimentación..."}
                                    className="w-full bg-[#080C14] border border-white/5 rounded-3xl p-8 text-slate-200 placeholder-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 transition-all min-h-[180px] resize-none font-semibold text-lg"
                                />
                                <p className="text-[11px] font-bold text-slate-600 text-center uppercase tracking-widest leading-relaxed">
                                    {t('adminNotes.footer') || 'Estos comentarios serán visibles para el profesor si se rechaza.'}
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Sticky Actions Footer */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#080C14]/95 backdrop-blur-3xl border-t border-white/5 py-8 px-8">
                <div className="max-w-4xl mx-auto flex gap-6">
                    <button
                        onClick={() => handleReview(false)}
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-4 bg-[#111827] hover:bg-[#1F2937] border border-white/10 text-slate-300 font-black py-6 rounded-3xl transition-all hover:scale-[1.02] active:scale-95 group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin text-red-500" />
                        ) : (
                            <X className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-lg tracking-tight">{t('buttons.reject') || 'Rechazar'}</span>
                    </button>

                    <button
                        onClick={() => handleReview(true)}
                        disabled={isSubmitting}
                        className="flex-[1.5] flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                        ) : (
                            <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-lg tracking-tight">{t('buttons.approve') || 'Aprobar Contenido'}</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
