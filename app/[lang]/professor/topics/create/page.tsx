"use client";

import React, { useState } from 'react';
import {
    Plus,
    Trash2,
    ChevronRight,
    ChevronLeft,
    Layout,
    BookOpen,
    Video,
    Image as ImageIcon,
    Type,
    Gamepad2,
    CheckCircle2,
    ArrowLeft,
    PlusCircle,
    Save,
    Music,
    FileUp,
    Loader2
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { topics, stages as stageService, mediaApi, categories as categoriesApi } from '@/lib/api';

interface StageData {
    id: string;
    title: string;
    description: string;
    content: string;
    mediaType: 'none' | 'video' | 'image' | 'audio' | 'document';
    mediaUrl?: string;
    mediaFilename?: string;
    mediaFiles?: { url: string; type: string; filename: string }[];
    challengeType: 'classification' | 'matching' | 'quiz';
    interactiveConfig: any;
}

export default function ThemeBuilderPage() {
    const { lang } = useParams();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [step, setStep] = useState(0); // 0: General Info, 1+: Stages
    const [activeStageIndex, setActiveStageIndex] = useState(0);

    const [topicData, setTopicData] = useState({
        title: '',
        description: '',
        categoryId: '',
    });

    const [categoriesList, setCategoriesList] = useState<any[]>([]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesApi.getAll();
                setCategoriesList(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Map mediaType to backend expected value
            const currentMediaType = stages[activeStageIndex].mediaType;
            formData.append('media_type', currentMediaType === 'document' ? 'document' : currentMediaType);

            const data = await mediaApi.upload(formData);
            const newMedia = {
                url: data.url,
                type: currentMediaType === 'document' ? 'document' : currentMediaType as string,
                filename: data.filename
            };

            const currentFiles = stages[activeStageIndex].mediaFiles || [];
            updateStage(activeStageIndex, {
                mediaUrl: data.url,
                mediaFilename: data.filename,
                mediaFiles: [...currentFiles, newMedia]
            });
        } catch (error: any) {
            console.error('Upload error:', error);
            alert(`Error al subir el archivo: ${error.message}`);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const [stages, setStages] = useState<StageData[]>([
        {
            id: crypto.randomUUID(),
            title: 'Etapa 1',
            description: '',
            content: '',
            mediaType: 'none',
            challengeType: 'classification',
            interactiveConfig: { buckets: [], items: [] },
        }
    ]);

    const addStage = () => {
        const newStage: StageData = {
            id: crypto.randomUUID(),
            title: `Etapa ${stages.length + 1}`,
            description: '',
            content: '',
            mediaType: 'none',
            challengeType: 'classification',
            interactiveConfig: { buckets: [], items: [] },
        };
        setStages([...stages, newStage]);
        setActiveStageIndex(stages.length);
        setStep(1);
    };

    const removeStage = (index: number) => {
        if (stages.length === 1) return;
        const newStages = stages.filter((_, i) => i !== index);
        setStages(newStages);
        if (activeStageIndex >= newStages.length) {
            setActiveStageIndex(newStages.length - 1);
        }
    };

    const updateStage = (index: number, data: Partial<StageData>) => {
        const newStages = [...stages];
        newStages[index] = { ...newStages[index], ...data };
        setStages(newStages);
    };

    const handleFinish = async () => {
        if (!topicData.title || !topicData.categoryId) {
            alert('Por favor, completa el título y la categoría del tema.');
            setStep(0);
            return;
        }

        setIsSaving(true);
        try {
            // 1. Create Topic
            const newTopic = await topics.create({
                title: topicData.title,
                description: topicData.description,
                category_id: parseInt(topicData.categoryId),
            });

            // 2. Create Stages for this Topic
            for (let i = 0; i < stages.length; i++) {
                const s = stages[i];
                await topics.addStage(newTopic.id, {
                    title: s.title,
                    description: s.description || '',
                    content: s.content || '',
                    order: i + 1,
                    media_type: s.mediaType === 'none' ? null : s.mediaType,
                    media_url: s.mediaUrl || null,
                    media_filename: s.mediaFilename || null,
                    media_files: s.mediaFiles || [],
                    interactive_config: s.interactiveConfig || {},
                });
            }

            router.push(`/${lang}/professor`);
        } catch (error) {
            console.error('Error saving topic:', error);
            alert('Error al guardar el tema. Verifica que el servidor esté activo.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050511] text-white font-sans flex flex-col">
            {/* Header */}
            <header className="px-6 py-4 bg-[#080C14] border-b border-white/5 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">Creador de <span className="text-blue-500">Temas</span></h1>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mt-1">
                            {topicData.title || 'Nuevo Tema Educativo'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 rounded-xl text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                        Guardar Borrador
                    </button>
                    <button
                        onClick={handleFinish}
                        disabled={isSaving}
                        className={clsx(
                            "bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2",
                            isSaving && "opacity-50 cursor-not-allowed shadow-none"
                        )}
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <CheckCircle2 className="w-4 h-4" />
                        )}
                        {isSaving ? 'Guardando...' : 'Finalizar y Enviar'}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Navigation */}
                <aside className="w-72 bg-[#080C14] border-r border-white/5 flex flex-col overflow-y-auto p-6 hidden lg:flex">
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Estructura</p>
                            <button
                                onClick={() => setStep(0)}
                                className={clsx(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm",
                                    step === 0 ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:bg-white/5"
                                )}
                            >
                                <Layout className="w-4 h-4" />
                                Información General
                            </button>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Etapas</p>
                                <span className="text-[10px] font-black bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded-md">{stages.length}</span>
                            </div>

                            {stages.map((s, i) => (
                                <div key={s.id} className="group relative">
                                    <button
                                        onClick={() => { setStep(1); setActiveStageIndex(i); }}
                                        className={clsx(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm text-left",
                                            (step === 1 && activeStageIndex === i) ? "bg-white/10 text-white border border-white/10" : "text-slate-400 hover:bg-white/5"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black",
                                            (step === 1 && activeStageIndex === i) ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-500"
                                        )}>
                                            {i + 1}
                                        </div>
                                        <span className="truncate">{s.title || `Etapa ${i + 1}`}</span>
                                    </button>
                                    {stages.length > 1 && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeStage(i); }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                onClick={addStage}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-dashed border-white/5 text-slate-500 hover:border-blue-500/30 hover:text-blue-400 transition-all font-bold text-sm mt-4"
                            >
                                <Plus className="w-4 h-4" />
                                Añadir Etapa
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#050511] p-6 lg:p-12 relative text-white">
                    <div className="max-w-3xl mx-auto space-y-12 pb-20">

                        {step === 0 ? (
                            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Configuración del <span className="text-blue-500">Tema</span></h2>
                                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Define el nombre y la categoría de tu contenido</p>
                                </div>

                                <div className="space-y-6 bg-[#0F172A] p-8 rounded-[40px] border border-white/5 shadow-2xl">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Título del Tema</label>
                                        <input
                                            type="text"
                                            value={topicData.title}
                                            onChange={(e) => setTopicData({ ...topicData, title: e.target.value })}
                                            placeholder="Ej: El Ciclo del Agua, Verbos Irregulares..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all font-bold text-lg placeholder:text-slate-600"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Descripción Breve</label>
                                        <textarea
                                            value={topicData.description}
                                            onChange={(e) => setTopicData({ ...topicData, description: e.target.value })}
                                            rows={3}
                                            placeholder="Resume de qué trata este tema en pocas palabras..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all font-bold placeholder:text-slate-600"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Categoría</label>
                                            <select
                                                value={topicData.categoryId}
                                                onChange={(e) => setTopicData({ ...topicData, categoryId: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all font-bold appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-[#0F172A]">Seleccionar Categoría</option>
                                                {categoriesList.map((cat) => (
                                                    <option key={cat.id} value={cat.id.toString()} className="bg-[#0F172A]">
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                    >
                                        Siguiente: Contenido
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </section>
                        ) : (
                            <section className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">ETAPA {activeStageIndex + 1}</span>
                                            <h2 className="text-3xl font-black text-white tracking-tight">{stages[activeStageIndex].title}</h2>
                                        </div>
                                        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Configura la teoría y el desafío interactivo</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {/* Sub-section: Theory */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-blue-400">
                                            <BookOpen className="w-5 h-5" />
                                            <h3 className="font-black text-sm uppercase tracking-widest leading-none">1. Contenido Teórico</h3>
                                        </div>

                                        <div className="bg-[#0F172A] p-8 rounded-[40px] border border-white/5 space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Título de la Etapa</label>
                                                <input
                                                    type="text"
                                                    value={stages[activeStageIndex].title}
                                                    onChange={(e) => updateStage(activeStageIndex, { title: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold placeholder:text-slate-600"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Explicación del Tema</label>
                                                <textarea
                                                    value={stages[activeStageIndex].content}
                                                    onChange={(e) => updateStage(activeStageIndex, { content: e.target.value })}
                                                    rows={8}
                                                    placeholder="Escribe aquí toda la teoría que quieres que el alumno aprenda en esta etapa..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold leading-relaxed placeholder:text-slate-600"
                                                />
                                            </div>

                                            {/* Media Selection */}
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Apoyo Audiovisual</label>

                                                {/* Hidden File Input */}
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileSelect}
                                                    className="hidden"
                                                    accept={
                                                        stages[activeStageIndex].mediaType === 'video' ? 'video/*' :
                                                            stages[activeStageIndex].mediaType === 'image' ? 'image/*' :
                                                                stages[activeStageIndex].mediaType === 'audio' ? 'audio/*' :
                                                                    stages[activeStageIndex].mediaType === 'document' ? '.pdf,.doc,.docx,.txt' :
                                                                        '*'
                                                    }
                                                />

                                                <div className="grid grid-cols-5 gap-4">
                                                    {[
                                                        { id: 'video', icon: Video, label: 'Video' },
                                                        { id: 'image', icon: ImageIcon, label: 'Imagen' },
                                                        { id: 'audio', icon: Music, label: 'Audio' },
                                                        { id: 'document', icon: FileUp, label: 'Archivo' },
                                                        { id: 'none', icon: Type, label: 'Ninguno' },
                                                    ].map((m) => (
                                                        <button
                                                            key={m.id}
                                                            onClick={() => {
                                                                updateStage(activeStageIndex, { mediaType: m.id as any });
                                                                if (m.id !== 'none') {
                                                                    // Wait for state to update so accept attribute is correct
                                                                    setTimeout(() => fileInputRef.current?.click(), 10);
                                                                }
                                                            }}
                                                            disabled={isUploading}
                                                            className={clsx(
                                                                "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all active:scale-95",
                                                                stages[activeStageIndex].mediaType === m.id ? "bg-blue-600/10 border-blue-500/50 text-blue-400" : "bg-white/5 border-white/10 text-slate-500 hover:text-white",
                                                                isUploading && "opacity-50 cursor-not-allowed"
                                                            )}
                                                        >
                                                            {isUploading && stages[activeStageIndex].mediaType === m.id ? (
                                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                            ) : (
                                                                <m.icon className="w-5 h-5" />
                                                            )}
                                                            <span className="text-[9px] font-black uppercase tracking-widest">{m.label}</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Uploaded Files List */}
                                                {stages[activeStageIndex].mediaFiles && stages[activeStageIndex].mediaFiles!.length > 0 && (
                                                    <div className="mt-4 space-y-3">
                                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Archivos Cargados ({stages[activeStageIndex].mediaFiles?.length})</p>
                                                        {stages[activeStageIndex].mediaFiles?.map((file, idx) => (
                                                            <div key={idx} className="flex items-center justify-between p-4 bg-blue-600/5 border border-blue-500/10 rounded-2xl group transition-all hover:bg-blue-600/10">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center">
                                                                        <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black text-white uppercase tracking-wider">
                                                                            {file.type === 'document' ? 'ARCHIVO' : file.type.toUpperCase()} CARGADO
                                                                        </span>
                                                                        <span className="text-[9px] text-slate-500 font-mono truncate max-w-[150px] sm:max-w-[300px]">
                                                                            {file.filename || file.url}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        const newFiles = [...(stages[activeStageIndex].mediaFiles || [])];
                                                                        newFiles.splice(idx, 1);
                                                                        updateStage(activeStageIndex, {
                                                                            mediaFiles: newFiles,
                                                                            ...(newFiles.length === 0
                                                                                ? { mediaUrl: undefined, mediaFilename: undefined }
                                                                                : { mediaUrl: newFiles[0].url, mediaFilename: newFiles[0].filename })
                                                                        });
                                                                    }}
                                                                    className="text-[10px] font-black text-red-400 hover:text-red-300 uppercase tracking-widest px-4 py-2 hover:bg-red-500/10 rounded-lg transition-all"
                                                                >
                                                                    Eliminar
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Compatibility: If no mediaFiles but has mediaUrl (for existing logic) */}
                                                {!stages[activeStageIndex].mediaFiles && stages[activeStageIndex].mediaUrl && stages[activeStageIndex].mediaType !== 'none' && (
                                                    <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between animate-in fade-in zoom-in-95 duration-300">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                                                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-black text-white uppercase tracking-widest">Archivo cargado con éxito</p>
                                                                <p className="text-[9px] text-slate-500 font-medium truncate max-w-[200px]">
                                                                    {stages[activeStageIndex].mediaUrl}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => updateStage(activeStageIndex, { mediaUrl: undefined })}
                                                            className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-widest px-3 py-1"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sub-section: Challenge */}
                                    <div className="space-y-4 pt-4">
                                        <div className="flex items-center gap-2 text-blue-400">
                                            <Gamepad2 className="w-5 h-5" />
                                            <h3 className="font-black text-sm uppercase tracking-widest leading-none">2. Desafío de Esfuerzo</h3>
                                        </div>

                                        <div className="bg-[#0F172A] p-8 rounded-[40px] border border-white/5 space-y-6">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tipo de Actividad</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {[
                                                        { id: 'classification', label: 'Clasificación', desc: 'Arrastrar items a contenedores' },
                                                        { id: 'matching', label: 'Pareo', desc: 'Conectar conceptos con líneas' },
                                                    ].map((c) => (
                                                        <button
                                                            key={c.id}
                                                            onClick={() => {
                                                                const defaultConfig = c.id === 'classification'
                                                                    ? { buckets: [], items: [] }
                                                                    : { pairs: [] };
                                                                updateStage(activeStageIndex, {
                                                                    challengeType: c.id as any,
                                                                    interactiveConfig: stages[activeStageIndex].challengeType === c.id
                                                                        ? stages[activeStageIndex].interactiveConfig
                                                                        : defaultConfig
                                                                });
                                                            }}
                                                            className={clsx(
                                                                "flex flex-col items-start gap-1 p-5 rounded-2xl border transition-all active:scale-95 text-left",
                                                                stages[activeStageIndex].challengeType === c.id ? "bg-blue-600/10 border-blue-500/50 text-blue-400" : "bg-white/5 border-white/10 text-slate-500 hover:text-white"
                                                            )}
                                                        >
                                                            <span className="text-xs font-black uppercase tracking-widest">{c.label}</span>
                                                            <span className="text-[9px] font-bold opacity-60 leading-tight">{c.desc}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Specialized Editor: Classification */}
                                            {stages[activeStageIndex].challengeType === 'classification' && (
                                                <div className="space-y-6 pt-6 border-t border-white/5">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contenedores (Categorías)</label>
                                                            <button
                                                                onClick={() => {
                                                                    const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                    if (!config.buckets) config.buckets = [];
                                                                    config.buckets.push({ id: crypto.randomUUID(), name: '' });
                                                                    updateStage(activeStageIndex, { interactiveConfig: config });
                                                                }}
                                                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest"
                                                            >
                                                                <PlusCircle className="w-3.5 h-3.5" /> Añadir Contenedor
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            {stages[activeStageIndex].interactiveConfig.buckets?.map((bucket: any, bi: number) => (
                                                                <div key={bucket.id} className="flex gap-2">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Ej: Sustantivos"
                                                                        value={bucket.name}
                                                                        onChange={(e) => {
                                                                            const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                            config.buckets[bi].name = e.target.value;
                                                                            updateStage(activeStageIndex, { interactiveConfig: config });
                                                                        }}
                                                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                                                    />
                                                                    <button
                                                                        onClick={() => {
                                                                            const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                            config.buckets.splice(bi, 1);
                                                                            config.items = config.items?.filter((item: any) => item.bucketId !== bucket.id) || [];
                                                                            updateStage(activeStageIndex, { interactiveConfig: config });
                                                                        }}
                                                                        className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Items para clasificar</label>
                                                            <button
                                                                onClick={() => {
                                                                    const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                    if (!config.items) config.items = [];
                                                                    config.items.push({ id: crypto.randomUUID(), content: '', bucketId: '' });
                                                                    updateStage(activeStageIndex, { interactiveConfig: config });
                                                                }}
                                                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest"
                                                            >
                                                                <PlusCircle className="w-3.5 h-3.5" /> Añadir Item
                                                            </button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {stages[activeStageIndex].interactiveConfig.items?.map((item: any, ii: number) => (
                                                                <div key={item.id} className="flex flex-col sm:flex-row gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Ej: Casa"
                                                                        value={item.content}
                                                                        onChange={(e) => {
                                                                            const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                            config.items[ii].content = e.target.value;
                                                                            updateStage(activeStageIndex, { interactiveConfig: config });
                                                                        }}
                                                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                                                    />
                                                                    <select
                                                                        value={item.bucketId}
                                                                        onChange={(e) => {
                                                                            const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                            config.items[ii].bucketId = e.target.value;
                                                                            updateStage(activeStageIndex, { interactiveConfig: config });
                                                                        }}
                                                                        className="bg-[#111827] border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:outline-none transition-all"
                                                                    >
                                                                        <option value="">Selecciona Contenedor</option>
                                                                        {stages[activeStageIndex].interactiveConfig.buckets?.map((b: any) => (
                                                                            <option key={b.id} value={b.id}>{b.name || 'Sin nombre'}</option>
                                                                        ))}
                                                                    </select>
                                                                    <button
                                                                        onClick={() => {
                                                                            const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                            config.items.splice(ii, 1);
                                                                            updateStage(activeStageIndex, { interactiveConfig: config });
                                                                        }}
                                                                        className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Specialized Editor: Matching */}
                                            {stages[activeStageIndex].challengeType === 'matching' && (
                                                <div className="space-y-6 pt-6 border-t border-white/5">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Pares de Elementos</label>
                                                            <button
                                                                onClick={() => {
                                                                    const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                    if (!config.pairs) config.pairs = [];
                                                                    config.pairs.push({ id: crypto.randomUUID(), left: '', right: '' });
                                                                    updateStage(activeStageIndex, { interactiveConfig: config });
                                                                }}
                                                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest"
                                                            >
                                                                <PlusCircle className="w-3.5 h-3.5" /> Añadir Par
                                                            </button>
                                                        </div>
                                                        <div className="space-y-4">
                                                            {stages[activeStageIndex].interactiveConfig.pairs?.map((pair: any, pi: number) => (
                                                                <div key={pair.id} className="flex flex-col sm:flex-row items-center gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                                                                    <div className="flex-1 w-full space-y-1">
                                                                        <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Izquierda (Concepto)</label>
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Ej: 2 + 2"
                                                                            value={pair.left}
                                                                            onChange={(e) => {
                                                                                const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                                config.pairs[pi].left = e.target.value;
                                                                                updateStage(activeStageIndex, { interactiveConfig: config });
                                                                            }}
                                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                                                        />
                                                                    </div>
                                                                    <div className="hidden sm:block text-slate-600 font-black">→</div>
                                                                    <div className="flex-1 w-full space-y-1">
                                                                        <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Derecha (Respuesta)</label>
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Ej: 4"
                                                                            value={pair.right}
                                                                            onChange={(e) => {
                                                                                const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                                config.pairs[pi].right = e.target.value;
                                                                                updateStage(activeStageIndex, { interactiveConfig: config });
                                                                            }}
                                                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm font-bold focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        onClick={() => {
                                                                            const config = { ...stages[activeStageIndex].interactiveConfig };
                                                                            config.pairs.splice(pi, 1);
                                                                            updateStage(activeStageIndex, { interactiveConfig: config });
                                                                        }}
                                                                        className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all sm:mt-4"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-10 border-t border-white/5">
                                    <button
                                        onClick={() => activeStageIndex > 0 ? setActiveStageIndex(activeStageIndex - 1) : setStep(0)}
                                        className="text-slate-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Anterior
                                    </button>

                                    {activeStageIndex < stages.length - 1 ? (
                                        <button
                                            onClick={() => setActiveStageIndex(activeStageIndex + 1)}
                                            className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                        >
                                            Siguiente Etapa
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={addStage}
                                            className="bg-blue-600/10 border border-blue-500/20 text-blue-400 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-blue-600 hover:text-white active:scale-95 flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Nueva Etapa
                                        </button>
                                    )}
                                </div>
                            </section>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
