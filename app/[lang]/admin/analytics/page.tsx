"use client";

import React from 'react';
import {
    Search,
    ChevronDown,
    TrendingUp,
    FileText,
    Table,
    Clock,
    AlertCircle,
    LayoutGrid,
    Users,
    BookOpen,
    Settings,
    ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AnalyticsPage() {
    const params = useParams();
    const lang = params.lang as string;

    return (
        <div className="min-h-screen bg-[#050511] text-white font-sans pb-20">
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
                {/* Filters */}
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    <button className="flex items-center gap-2 bg-[#151525] px-4 py-2.5 rounded-xl border border-blue-500/30 text-blue-400 text-sm font-semibold whitespace-nowrap">
                        Grupo: Clase A <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <button className="flex items-center gap-2 bg-[#151525] px-4 py-2.5 rounded-xl border border-white/5 text-gray-300 text-sm font-medium whitespace-nowrap">
                        Tema: Álgebra <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <button className="flex items-center gap-2 bg-[#151525] px-4 py-2.5 rounded-xl border border-white/5 text-gray-300 text-sm font-medium whitespace-nowrap">
                        Etapa <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>

                {/* Resumen de Rendimiento Section */}
                <div>
                    <h2 className="text-xl font-bold mb-1">Resumen de Rendimiento</h2>
                    <p className="text-gray-400 text-sm mb-5">Identificando puntos críticos de ruptura en el currículo</p>

                    {/* Chart Card */}
                    <div className="bg-[#151525] rounded-3xl p-6 border border-white/5 relative overflow-hidden">

                        {/* Header Metrics */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-gray-400 font-medium text-sm mb-1">Puntos de Ruptura</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-blue-400">82.4%</span>
                                    <span className="text-gray-400 text-sm">Tasa de Retención</span>
                                </div>
                            </div>
                            <div className="bg-green-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-green-400 text-xs font-bold font-mono">+2.4%</span>
                            </div>
                        </div>

                        {/* Graph Visualization (Custom SVG for pixel perfection) */}
                        <div className="relative h-48 w-full mb-6">
                            {/* Tooltip for Break Point */}
                            <div className="absolute top-[30%] left-[55%] -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
                                <div className="bg-blue-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                                    Punto de Ruptura
                                </div>
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-500 mt-[-1px]"></div>
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
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M0,45 C20,45 30,35 50,20 S70,45 100,25"
                                    fill="url(#gradientLine)"
                                    className="opacity-20"
                                />
                                {/* Dots */}
                                <circle cx="50" cy="20" r="2" fill="#3B82F6" className="drop-shadow-[0_0_8px_rgba(59,130,246,1)]" />
                                <circle cx="70" cy="38" r="2" fill="#3B82F6" />
                            </svg>
                        </div>

                        {/* X-Axis Labels */}
                        <div className="flex justify-between px-2 text-[10px] tracking-wider uppercase font-bold text-gray-500">
                            <div className="text-center w-1/4">
                                <span className="block opacity-60">Etapa 1</span>
                                <span className="text-white">Intro</span>
                            </div>
                            <div className="text-center w-1/4">
                                <span className="block opacity-60">Etapa 2</span>
                                <span className="text-white">Básico</span>
                            </div>
                            <div className="text-center w-1/4">
                                <span className="block opacity-60 text-blue-400">Etapa 3</span>
                                <span className="text-white">Núcleo</span>
                            </div>
                            <div className="text-center w-1/4">
                                <span className="block opacity-60">Etapa 4</span>
                                <span className="text-white">Final</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Export Reports Section */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Exportar Reportes</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {/* PDF Button */}
                        <button className="bg-[#151525] p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#1A1A2E] transition group">
                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition">
                                <FileText className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="text-center">
                                <span className="block font-bold text-white text-sm">Descargar PDF</span>
                                <span className="block text-gray-500 text-[10px] mt-1">Resumen Visual</span>
                            </div>
                        </button>

                        {/* Excel Button */}
                        <button className="bg-[#151525] p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#1A1A2E] transition group">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition">
                                <Table className="w-6 h-6 text-green-500" />
                            </div>
                            <div className="text-center">
                                <span className="block font-bold text-white text-sm">Exportar Excel</span>
                                <span className="block text-gray-500 text-[10px] mt-1">Datos Brutos</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Small Metric Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Completion Time */}
                    <div className="bg-[#151525] p-5 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Promedio de completitud</p>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-2xl font-bold text-white">42m</span>
                            <span className="text-gray-500 text-xs">por lección</span>
                        </div>
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-3/4 rounded-full" />
                        </div>
                    </div>

                    {/* Failure Rate */}
                    <div className="bg-[#151525] p-5 rounded-3xl border border-white/5">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Tasa de Fallos</p>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-2xl font-bold text-red-500">12.5%</span>
                            <span className="text-gray-500 text-xs">Etapa 3</span>
                        </div>
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[12.5%] rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Students At Alert */}
                <div className="bg-[#151525] rounded-3xl p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Estudiantes en Alerta</h3>
                        <Link href="#" className="text-blue-500 text-xs font-bold hover:text-blue-400">Ver todos</Link>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-xs">MC</div>
                                <div>
                                    <p className="font-bold text-sm">Marcus Chen</p>
                                    <p className="text-gray-500 text-xs">Hace 2 horas</p>
                                </div>
                            </div>
                            <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-1 rounded-md border border-red-500/20">
                                EN RIESGO
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-xs">SJ</div>
                                <div>
                                    <p className="font-bold text-sm">Sarah Jenkins</p>
                                    <p className="text-gray-500 text-xs">Hace 5 horas</p>
                                </div>
                            </div>
                            <span className="bg-orange-500/10 text-orange-500 text-[10px] font-bold px-2 py-1 rounded-md border border-orange-500/20">
                                RETRASADO
                            </span>
                        </div>
                    </div>
                </div>

            </main>

            {/* Bottom Navigation (Admin Version) */}
            <nav className="fixed bottom-0 w-full bg-[#050511] border-t border-white/5 px-6 py-4 flex justify-between items-center z-50">
                <div className="flex flex-col items-center gap-1 text-blue-500">
                    <LayoutGrid className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Reportes</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition">
                    <Users className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Estudiantes</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition">
                    <BookOpen className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Curso</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition">
                    <Settings className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Configuración</span>
                </div>
            </nav>
        </div>
    );
}
