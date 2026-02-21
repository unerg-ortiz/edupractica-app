"use client";

import React, { useEffect, useState } from 'react';
import {
    Search,
    ChevronDown,
    TrendingUp,
    FileText,
    Table,
    LayoutGrid,
    Users,
    Loader2,
    AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { analytics } from '@/lib/api';

interface DashboardData {
    total_students: number;
    completion_rate: number;
    avg_time_per_stage_seconds: number;
    difficult_stages: Array<{
        stage_title: string;
        failure_rate: number;
        total_attempts: number;
    }>;
}

export default function AnalyticsPage() {
    const { lang } = useParams();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [exportingPDF, setExportingPDF] = useState(false);
    const [exportingExcel, setExportingExcel] = useState(false);

    // Load dashboard data
    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await analytics.getDashboard();
                console.log('Dashboard data loaded:', result);
                setData(result);
            } catch (err: any) {
                console.error('Error fetching dashboard:', err);
                setError(err.message || 'Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

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

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050511] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-slate-400 font-medium">Cargando analíticas...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-[#050511] flex items-center justify-center px-6">
                <div className="flex flex-col items-center gap-4 max-w-md text-center">
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                    <h2 className="text-xl font-bold text-white">Error al cargar datos</h2>
                    <p className="text-slate-400">{error || 'No se pudieron cargar los datos'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050511] text-white font-sans pb-8">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-5 bg-[#050511] sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                        <LayoutGrid className="w-5 h-5 text-blue-500" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Analítica Visual</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Search className="w-6 h-6 text-gray-400" />
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm">
                        JD
                    </div>
                </div>
            </header>

            <main className="px-6 space-y-8">
                {/* Filters - Currently disabled as backend doesn't support detailed filtering yet
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    <button className="flex items-center gap-2 bg-[#151525] px-4 py-2.5 rounded-xl border border-blue-500/30 text-blue-400 text-sm font-semibold whitespace-nowrap opacity-50 cursor-not-allowed">
                        Grupo: Todos <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <button className="flex items-center gap-2 bg-[#151525] px-4 py-2.5 rounded-xl border border-white/5 text-gray-300 text-sm font-medium whitespace-nowrap opacity-50 cursor-not-allowed">
                        Tema: Todos <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <button className="flex items-center gap-2 bg-[#151525] px-4 py-2.5 rounded-xl border border-white/5 text-gray-300 text-sm font-medium whitespace-nowrap opacity-50 cursor-not-allowed">
                        Etapa: Todas <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>
                */}

                {/* Resumen de Rendimiento Section */}
                <div>
                    <h2 className="text-xl font-bold mb-1">Resumen de Rendimiento</h2>
                    <p className="text-gray-400 text-sm mb-5">Identificando puntos críticos de ruptura en el currículo</p>

                    {/* Chart Card */}
                    <div className="bg-[#151525] rounded-3xl p-6 border border-white/5 relative overflow-hidden">

                        {/* Header Metrics */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-gray-400 font-medium text-sm mb-1">Tasa de Finalización</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-blue-400">{data.completion_rate}%</span>
                                    <span className="text-gray-400 text-sm">Tasa de Retención</span>
                                </div>
                            </div>
                            <div className="bg-blue-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                                <span className="text-blue-400 text-xs font-bold font-mono">Global</span>
                            </div>
                        </div>

                        {/* Difficult Stages Visualization */}
                        {data.difficult_stages && data.difficult_stages.length > 0 && (
                            <div className="space-y-4 mb-6">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Top Puntos de Ruptura</h4>
                                {data.difficult_stages.map((stage, idx) => (
                                    <div key={idx} className="bg-[#1A1A2E] rounded-2xl p-4 border border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white font-bold text-sm">{stage.stage_title}</span>
                                            <span className="text-red-400 font-bold text-lg">{stage.failure_rate}%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span>Tasa de Fallo</span>
                                            <span>{stage.total_attempts} intentos</span>
                                        </div>
                                        <div className="mt-2 h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-red-500 rounded-full transition-all" 
                                                style={{ width: `${stage.failure_rate}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Export Reports Section */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Exportar Reportes</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {/* PDF Button */}
                        <button 
                            onClick={handleExportPDF}
                            disabled={exportingPDF}
                            className="bg-[#151525] p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#1A1A2E] transition group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {exportingPDF ? (
                                <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                            ) : (
                                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition">
                                    <FileText className="w-6 h-6 text-red-500" />
                                </div>
                            )}
                            <div className="text-center">
                                <span className="block font-bold text-white text-sm">
                                    {exportingPDF ? 'Generando...' : 'Descargar PDF'}
                                </span>
                                <span className="block text-gray-500 text-[10px] mt-1">Resumen Visual</span>
                            </div>
                        </button>

                        {/* Excel Button */}
                        <button 
                            onClick={handleExportExcel}
                            disabled={exportingExcel}
                            className="bg-[#151525] p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#1A1A2E] transition group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {exportingExcel ? (
                                <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                            ) : (
                                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition">
                                    <Table className="w-6 h-6 text-green-500" />
                                </div>
                            )}
                            <div className="text-center">
                                <span className="block font-bold text-white text-sm">
                                    {exportingExcel ? 'Generando...' : 'Exportar Excel'}
                                </span>
                                <span className="block text-gray-500 text-[10px] mt-1">Datos Brutos</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Small Metric Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Average Time */}
                    <div className="bg-[#151525] p-5 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Tiempo Promedio</p>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-2xl font-bold text-white">{formatTime(data.avg_time_per_stage_seconds)}</span>
                            <span className="text-gray-500 text-xs">por etapa</span>
                        </div>
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-3/4 rounded-full" />
                        </div>
                    </div>

                    {/* Total Students */}
                    <div className="bg-[#151525] p-5 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Estudiantes Activos</p>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-2xl font-bold text-blue-500">{data.total_students}</span>
                            <span className="text-gray-500 text-xs">Usuarios</span>
                        </div>
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-full rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Info Note - Removed mock students section */}
                <div className="bg-blue-500/5 rounded-3xl p-6 border border-blue-500/10">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm mb-1">Panel de Analíticas Global</h3>
                            <p className="text-gray-400 text-xs leading-relaxed">
                                Esta vista muestra métricas agregadas de todos los estudiantes y contenidos del sistema. 
                                Para análisis detallados por estudiante, visita la sección de Estudiantes.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
