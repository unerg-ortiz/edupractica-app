"use client";

import React, { useEffect, useState } from 'react';
import {
    Search,
    ChevronDown,
    TrendingUp,
    FileText,
    Table,
    Users,
    Loader2,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { analytics, topics as topicsApi } from '@/lib/api';

interface AnalyticsData {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    total_students: number;
    retention_rate: number;
    avg_time_per_stage_minutes: number;
    failure_rate: number;
    stages: Array<{
        stage_id: number;
        stage_title: string;
        order: number;
        total_students: number;
        completed: number;
        completion_rate: number;
    }>;
    students_at_risk: Array<{
        user_id: number;
        full_name: string;
        email: string;
        failure_rate: number;
        total_attempts: number;
        last_attempt: string | null;
        risk_level: string;
    }>;
}

interface Topic {
    id: number;
    title: string;
    category_id: number;
    stages?: Array<{
        id: number;
        title: string;
        order: number;
    }>;
}

export default function AnalyticsPage() {
    const { lang } = useParams();
    const router = useRouter();
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const [selectedStageId, setSelectedStageId] = useState<number | null>(null);
    const [showTopicDropdown, setShowTopicDropdown] = useState(false);
    const [showStageDropdown, setShowStageDropdown] = useState(false);
    
    const [exportingPDF, setExportingPDF] = useState(false);
    const [exportingExcel, setExportingExcel] = useState(false);
    const [topicButtonRect, setTopicButtonRect] = useState<DOMRect | null>(null);
    const [stageButtonRect, setStageButtonRect] = useState<DOMRect | null>(null);

    // Load professor's topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const result = await topicsApi.getMyTopics(0, 100);
                console.log('Topics loaded:', result);
                setTopics(result);
            } catch (err) {
                console.error('Error fetching topics:', err);
            }
        };
        fetchTopics();
    }, []);

    // Load analytics (refetch when filters change)
    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const result = await analytics.getProfessorSummary();
                
                // Filter data locally based on selected filters
                let filteredData = { ...result };
                
                if (selectedTopicId) {
                    // Filter stages by topic
                    const selectedTopic = topics.find(t => t.id === selectedTopicId);
                    if (selectedTopic && selectedTopic.stages) {
                        const stageIds = selectedTopic.stages.map(s => s.id);
                        filteredData.stages = result.stages.filter(s => stageIds.includes(s.stage_id));
                    }
                }
                
                if (selectedStageId) {
                    // Filter to single stage
                    filteredData.stages = result.stages.filter(s => s.stage_id === selectedStageId);
                }
                
                setData(filteredData);
            } catch (err: any) {
                console.error('Error fetching analytics:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [selectedTopicId, selectedStageId, topics]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        console.log('Dropdown state changed - Topic:', showTopicDropdown, 'Stage:', showStageDropdown);
        
        if (!showTopicDropdown && !showStageDropdown) return;
        
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Only close if click is outside dropdown containers
            if (!target.closest('.dropdown-container')) {
                console.log('Clicking outside, closing dropdowns');
                setShowTopicDropdown(false);
                setShowStageDropdown(false);
            }
        };
        
        // Add small delay to avoid capturing the same click that opened the dropdown
        const timeoutId = setTimeout(() => {
            console.log('Adding mousedown listener');
            document.addEventListener('mousedown', handleClickOutside);
        }, 100);
        
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showTopicDropdown, showStageDropdown]);

    // Close dropdowns on scroll or resize
    useEffect(() => {
        const handleScrollOrResize = () => {
            setShowTopicDropdown(false);
            setShowStageDropdown(false);
        };

        if (showTopicDropdown || showStageDropdown) {
            window.addEventListener('scroll', handleScrollOrResize, true);
            window.addEventListener('resize', handleScrollOrResize);
            
            return () => {
                window.removeEventListener('scroll', handleScrollOrResize, true);
                window.removeEventListener('resize', handleScrollOrResize);
            };
        }
    }, [showTopicDropdown, showStageDropdown]);

    // Export functions
    const handleExportPDF = async () => {
        setExportingPDF(true);
        try {
            await analytics.exportPDF();
        } catch (err: any) {
            console.error('Error exporting PDF:', err);
            alert('Error al exportar PDF: ' + err.message);
        } finally {
            setExportingPDF(false);
        }
    };

    const handleExportExcel = async () => {
        setExportingExcel(true);
        try {
            await analytics.exportExcel();
        } catch (err: any) {
            console.error('Error exporting Excel:', err);
            alert('Error al exportar Excel: ' + err.message);
        } finally {
            setExportingExcel(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080C14] text-white font-sans flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <p className="text-slate-400 text-sm font-bold">Cargando analíticas...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-[#080C14] text-white font-sans flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg font-bold mb-2">Error al cargar analíticas</p>
                    <p className="text-slate-400 text-sm">{error || 'No hay datos disponibles'}</p>
                </div>
            </div>
        );
    }

    // Find breakpoint stage (lowest completion rate)
    const breakpointStage = data.stages.length > 0 
        ? data.stages.reduce((min, stage) => stage.completion_rate < min.completion_rate ? stage : min, data.stages[0])
        : null;

    // Calculate trend (simplified)
    const trend = data.retention_rate > 80 ? '+2.4%' : data.retention_rate > 60 ? '+1.2%' : '-0.5%';
    const trendPositive = data.retention_rate > 60;

    return (
        <div className="min-h-screen bg-[#080C14] text-white font-sans pb-10">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-8">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Analítica <span className="text-blue-500">Visual</span></h1>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest opacity-60">Resumen de rendimiento y progreso académico</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/20">
                        JD
                    </div>
                </div>
            </header>

            <main className="px-6 space-y-8">
                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {/* Topic Filter */}
                    <div className="relative dropdown-container">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                setTopicButtonRect(rect);
                                console.log('Topic button clicked. Current state:', showTopicDropdown, 'Topics count:', topics.length);
                                setShowTopicDropdown(!showTopicDropdown);
                                setShowStageDropdown(false);
                            }}
                            className={`flex items-center gap-2 bg-[#111827] px-4 py-2.5 rounded-xl border text-sm font-semibold whitespace-nowrap ${
                                selectedTopicId ? 'border-blue-500/30 text-blue-400' : 'border-white/5 text-gray-300'
                            }`}
                        >
                            {selectedTopicId 
                                ? `Tema: ${topics.find(t => t.id === selectedTopicId)?.title || 'Seleccionado'}`
                                : 'Todos los temas'
                            }
                            {selectedTopicId && (
                                <X 
                                    className="w-3 h-3" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTopicId(null);
                                        setSelectedStageId(null);
                                    }}
                                />
                            )}
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </button>
                        {showTopicDropdown && topics.length > 0 && topicButtonRect && (
                            <div 
                                className="fixed bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl z-[9999] min-w-[200px] max-w-[calc(100vw-3rem)] max-h-[300px] overflow-y-auto"
                                style={{
                                    top: `${topicButtonRect.bottom + 8}px`,
                                    left: `${topicButtonRect.left}px`,
                                    minWidth: `${topicButtonRect.width}px`
                                }}
                                onMouseEnter={() => console.log('Dropdown is visible')}
                            >
                                {topics.map(topic => (
                                    <button
                                        key={topic.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Topic selected:', topic.title);
                                            setSelectedTopicId(topic.id);
                                            setSelectedStageId(null);
                                            setShowTopicDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 hover:bg-white/5 text-sm text-white font-medium border-b border-white/5 last:border-0"
                                    >
                                        {topic.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stage Filter */}
                    {selectedTopicId && topics.find(t => t.id === selectedTopicId)?.stages && (
                        <div className="relative dropdown-container">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setStageButtonRect(rect);
                                    setShowStageDropdown(!showStageDropdown);
                                    setShowTopicDropdown(false);
                                }}
                                className={`flex items-center gap-2 bg-[#111827] px-4 py-2.5 rounded-xl border text-sm font-semibold whitespace-nowrap ${
                                    selectedStageId ? 'border-blue-500/30 text-blue-400' : 'border-white/5 text-gray-300'
                                }`}
                            >
                                {selectedStageId 
                                    ? `Etapa: ${topics.find(t => t.id === selectedTopicId)?.stages?.find(s => s.id === selectedStageId)?.title || 'Seleccionada'}`
                                    : 'Todas las etapas'
                                }
                                {selectedStageId && (
                                    <X 
                                        className="w-3 h-3" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedStageId(null);
                                        }}
                                    />
                                )}
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                            {showStageDropdown && stageButtonRect && (
                                <div 
                                    className="fixed bg-[#1E293B] border border-white/10 rounded-xl shadow-2xl z-[9999] min-w-[200px] max-w-[calc(100vw-3rem)] max-h-[300px] overflow-y-auto"
                                    style={{
                                        top: `${stageButtonRect.bottom + 8}px`,
                                        left: `${stageButtonRect.left}px`,
                                        minWidth: `${stageButtonRect.width}px`
                                    }}
                                >
                                    {topics.find(t => t.id === selectedTopicId)?.stages?.map(stage => (
                                        <button
                                            key={stage.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedStageId(stage.id);
                                                setShowStageDropdown(false);
                                            }}
                                            className="w-full text-left px-4 py-2.5 hover:bg-white/5 text-sm text-white font-medium border-b border-white/5 last:border-0"
                                        >
                                            {stage.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Resumen de Rendimiento Section */}
                <div>
                    <h2 className="text-xl font-black mb-1 uppercase tracking-wider text-white/90">Resumen de Rendimiento</h2>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-5">Identificando puntos críticos de ruptura en el currículo</p>

                    {/* Chart Card */}
                    <div className="bg-[#0F172A] rounded-[32px] p-8 border border-white/5 relative overflow-hidden shadow-2xl">
                        {/* Decorative background */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />

                        {/* Header Metrics */}
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Puntos de Ruptura</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-blue-500">{data.retention_rate}%</span>
                                    <span className="text-slate-500 font-bold text-sm tracking-tight">Tasa de Retención</span>
                                </div>
                            </div>
                            <div className={`${trendPositive ? 'bg-emerald-500/10 border-emerald-500/10' : 'bg-red-500/10 border-red-500/10'} px-3 py-1.5 rounded-xl flex items-center gap-1.5 border`}>
                                <TrendingUp className={`w-4 h-4 ${trendPositive ? 'text-emerald-400' : 'text-red-400'}`} />
                                <span className={`${trendPositive ? 'text-emerald-400' : 'text-red-400'} text-xs font-black`}>{trend}</span>
                            </div>
                        </div>

                        {/* Graph Visualization */}
                        <div className="relative h-48 w-full mb-6 z-10">
                            {/* Tooltip for Break Point */}
                            <div className="absolute top-[30%] left-[55%] -translate-x-1/2 flex flex-col items-center animate-bounce">
                                <div className="bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-2xl">
                                    PUNTO DE RUPTURA
                                </div>
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600 mt-[-1px]"></div>
                            </div>

                            {/* The Line Graph */}
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                                <defs>
                                    <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,45 C20,45 30,35 50,20 S70,45 100,25"
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M0,45 C20,45 30,35 50,20 S70,45 100,25"
                                    fill="url(#gradientLine)"
                                    className="opacity-20"
                                />
                                <circle cx="50" cy="20" r="3" fill="#3B82F6" className="drop-shadow-[0_0_8px_rgba(59,130,246,1)]" />
                                <circle cx="70" cy="38" r="2.5" fill="#3B82F6" />
                            </svg>
                        </div>

                        {/* X-Axis Labels */}
                        <div className="flex justify-between px-2 text-[10px] tracking-widest uppercase font-black text-slate-500 relative z-10">
                            {data.stages.length === 0 ? (
                                <div className="text-center w-full">
                                    <span className="text-slate-400">Sin etapas disponibles</span>
                                </div>
                            ) : (
                                data.stages.slice(0, 4).map((stage, index) => (
                                    <div key={stage.stage_id} className={`text-center flex-1 ${index === 0 ? 'text-left' : index === 3 ? 'text-right' : ''}`}>
                                        <span className={`block opacity-60 ${breakpointStage?.stage_id === stage.stage_id ? 'text-blue-500' : ''}`}>
                                            Etapa {stage.order}
                                        </span>
                                        <span className="text-white text-[9px]">
                                            {stage.stage_title.substring(0, 8)}{stage.stage_title.length > 8 ? '...' : ''}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Export Reports Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-black mb-4 uppercase tracking-widest text-white/80">Exportar Reportes</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={handleExportPDF}
                                disabled={exportingPDF}
                                className="bg-[#111827] p-6 rounded-[32px] border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#1E293B] transition-all group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                    {exportingPDF ? (
                                        <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
                                    ) : (
                                        <FileText className="w-6 h-6 text-red-500" />
                                    )}
                                </div>
                                <div className="text-center">
                                    <span className="block font-black text-white text-xs uppercase tracking-widest">
                                        {exportingPDF ? 'Generando...' : 'Descargar PDF'}
                                    </span>
                                    <span className="block text-slate-500 text-[10px] mt-1 font-bold">Resumen Visual</span>
                                </div>
                            </button>

                            <button 
                                onClick={handleExportExcel}
                                disabled={exportingExcel}
                                className="bg-[#111827] p-6 rounded-[32px] border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#1E293B] transition-all group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                    {exportingExcel ? (
                                        <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                                    ) : (
                                        <Table className="w-6 h-6 text-emerald-500" />
                                    )}
                                </div>
                                <div className="text-center">
                                    <span className="block font-black text-white text-xs uppercase tracking-widest">
                                        {exportingExcel ? 'Generando...' : 'Exportar Excel'}
                                    </span>
                                    <span className="block text-slate-500 text-[10px] mt-1 font-bold">Datos Brutos</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Small Metric Cards Grid */}
                    <div>
                        <h2 className="text-lg font-black mb-4 uppercase tracking-widest text-white/80">Eficiencia</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#111827] p-6 rounded-[32px] border border-white/5">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Promedio de completitud</p>
                                <div className="flex items-baseline gap-1.5 mb-3">
                                    <span className="text-3xl font-black text-white">{data.avg_time_per_stage_minutes}m</span>
                                    <span className="text-slate-500 font-bold text-xs">por lección</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{width: `${Math.min(100, (data.avg_time_per_stage_minutes / 60) * 100)}%`}} />
                                </div>
                            </div>

                            <div className="bg-[#111827] p-6 rounded-[32px] border border-white/5">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Tasa de Fallos</p>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-3xl font-black text-red-500">{data.failure_rate}%</span>
                                    {breakpointStage && (
                                        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                                            {breakpointStage.stage_title.substring(0, 15)}{breakpointStage.stage_title.length > 15 ? '...' : ''}
                                        </span>
                                    )}
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 rounded-full" style={{width: `${Math.min(100, data.failure_rate)}%`}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Students At Alert */}
                <div className="bg-[#0F172A] rounded-[40px] p-8 border border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="font-black text-xl uppercase tracking-tighter">Estudiantes en Alerta</h3>
                        </div>
                        <Link href={`/${lang}/professor/students?filter=alert`} className="text-blue-500 text-[10px] font-black uppercase tracking-widest hover:text-blue-400 transition-colors">
                            Ver todos los alumnos en alerta
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {data.students_at_risk.length === 0 ? (
                            <div className="col-span-2 text-center py-8">
                                <p className="text-slate-400 text-sm">No hay estudiantes en alerta actualmente</p>
                            </div>
                        ) : (
                            data.students_at_risk.slice(0, 4).map((student) => {
                                const initials = student.full_name
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')
                                    .substring(0, 2)
                                    .toUpperCase();
                                
                                const timeAgo = student.last_attempt 
                                    ? new Date(student.last_attempt).toLocaleString('es', { 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    : 'Sin actividad';

                                const riskConfig = {
                                    high: { label: 'RIESGO ALTO', color: 'red' },
                                    medium: { label: 'RIESGO', color: 'orange' },
                                    inactive: { label: 'INACTIVO', color: 'gray' }
                                };
                                const config = riskConfig[student.risk_level as keyof typeof riskConfig] || riskConfig.medium;

                                return (
                                    <Link 
                                        key={student.user_id}
                                        href={`/${lang}/professor/students/${student.user_id}`} 
                                        className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:bg-white/[0.08] group/card"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black text-sm border-2 border-white/5 shadow-xl group-hover/card:border-blue-500/30 transition-all">
                                                {initials}
                                            </div>
                                            <div>
                                                <p className="font-black text-white text-base group-hover/card:text-blue-400 transition-colors">
                                                    {student.full_name}
                                                </p>
                                                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                                                    {timeAgo}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={
                                            student.risk_level === 'high' 
                                                ? 'bg-red-500/10 text-red-500 border-red-500/10 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border'
                                                : student.risk_level === 'medium'
                                                ? 'bg-orange-500/10 text-orange-500 border-orange-500/10 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border'
                                                : 'bg-gray-500/10 text-gray-500 border-gray-500/10 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border'
                                        }>
                                            {config.label}
                                        </span>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
