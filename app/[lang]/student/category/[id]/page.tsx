"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Check,
    Play,
    Lock,
    Trophy,
    ChevronLeft,
    Loader2,
    Lightbulb
} from 'lucide-react';
import { studentService } from '@/services/studentService';

interface Stage {
    id: number;
    title: string;
    description: string;
    order: number;
    is_unlocked: boolean;
    is_completed: boolean;
}

export default function CategoryStagesPage() {
    const { lang, id } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [stages, setStages] = useState<Stage[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [overallProgress, setOverallProgress] = useState(0);

    useEffect(() => {
        loadStages();
    }, [id]);

    const loadStages = async () => {
        setIsLoading(true);
        try {
            const data = await studentService.getCategoryStages(Number(id));
            setStages(data);
            
            // Calculate progress
            const completed = data.filter((s: any) => s.is_completed).length;
            const total = data.length;
            setOverallProgress(total > 0 ? Math.round((completed / total) * 100) : 0);
            
            // Get category name from first stage or fetch separately
            if (data.length > 0) {
                // You might want to fetch category details separately
                setCategoryName(`Categoría ${id}`);
            }
        } catch (error) {
            console.error('Error loading stages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStageStatus = (stage: Stage, index: number) => {
        if (stage.is_completed) return 'completed';
        if (stage.is_unlocked) return 'active';
        return 'locked';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050511] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                    <p className="text-slate-400 font-medium">Cargando ruta...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050511] text-white flex flex-col font-sans">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-6">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 rounded-full hover:bg-white/10 transition"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <h1 className="text-xl font-bold tracking-wide">Ruta de Aprendizaje</h1>
                <span className="text-cyan-400 font-bold text-sm">{overallProgress}%</span>
            </header>

            <main className="flex-1 px-6 pb-24 lg:pb-8">
                {/* Overall Progress Card */}
                <div className="bg-[#151525] rounded-3xl p-6 mb-8 shadow-lg border border-white/5">
                    <div className="flex justify-between items-end mb-3">
                        <h2 className="text-lg font-bold">Progreso General</h2>
                        <span className="text-gray-400 text-sm">
                            {stages.filter(s => s.is_completed).length} de {stages.length}
                        </span>
                    </div>
                    <div className="h-2 w-full bg-gray-700/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${overallProgress}%` }}
                        />
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative pl-4 space-y-8">
                    {/* Vertical Line */}
                    <div className="absolute left-[27px] top-6 bottom-10 w-0.5 bg-gray-800" />

                    {stages.map((stage, index) => {
                        const status = getStageStatus(stage, index);
                        const isLast = index === stages.length - 1;

                        return (
                            <div key={stage.id} className="relative z-10">
                                <div className="flex items-start gap-4">
                                    {/* Icon Node */}
                                    <div className="flex-shrink-0 flex flex-col items-center justify-center">
                                        {status === 'completed' && (
                                            <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] ring-4 ring-[#050511]">
                                                <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                                            </div>
                                        )}
                                        {status === 'active' && (
                                            <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.6)] ring-4 ring-[#050511] z-20">
                                                <Play className="w-3 h-3 text-black fill-current ml-0.5" />
                                            </div>
                                        )}
                                        {status === 'locked' && !isLast && (
                                            <div className="w-6 h-6 rounded-full bg-[#1A1A2E] flex items-center justify-center border border-gray-700 ring-4 ring-[#050511]">
                                                <Lock className="w-3 h-3 text-gray-500" />
                                            </div>
                                        )}
                                        {status === 'locked' && isLast && (
                                            <div className="w-10 h-10 rounded-full border-2 border-dashed border-orange-500/50 flex items-center justify-center bg-[#050511] transform -translate-x-[7px]">
                                                <Trophy className="w-4 h-4 text-orange-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-1 ${status === 'active' ? 'mt-[-10px]' : ''}`}>
                                        {/* Active Card */}
                                        {status === 'active' ? (
                                            <div className="bg-[#151525] rounded-2xl p-5 border border-white/5 shadow-xl relative overflow-hidden group">
                                                {/* Glow effect */}
                                                <div className="absolute -left-4 top-10 w-20 h-20 bg-cyan-500/10 blur-2xl rounded-full" />

                                                <h3 className="text-white font-bold text-lg mb-1">{stage.title}</h3>
                                                <p className="text-gray-400 text-sm mb-4">{stage.description}</p>

                                                <div className="flex items-center gap-4">
                                                    <button 
                                                        onClick={() => router.push(`/${lang}/student/stage/${stage.id}`)}
                                                        className="bg-cyan-400 hover:bg-cyan-300 text-black text-sm font-bold py-2 px-6 rounded-xl transition shadow-lg shadow-cyan-900/20"
                                                    >
                                                        Continuar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // Non-active Item
                                            <div className={`py-0.5 ${isLast ? 'mt-1' : ''}`}>
                                                <h3 className={`font-bold text-base ${status === 'locked' ? 'text-gray-500' : 'text-white'}`}>
                                                    {stage.title}
                                                </h3>
                                                {stage.description && (
                                                    <p className={`text-sm mt-0.5 ${status === 'locked' ? 'text-gray-600' : 'text-gray-400'}`}>
                                                        {stage.description}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pro Tip Card */}
                <div className="mt-12 bg-[#151525] rounded-3xl p-5 flex gap-4 items-start border border-white/5">
                    <div className="mt-1">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Lightbulb className="w-5 h-5 text-cyan-300" />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-1">Consejo Pro</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            ¡Completar 3 lecciones diarias aumenta tu tasa de retención en un 40%!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
