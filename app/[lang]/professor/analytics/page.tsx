"use client";

import React from 'react';
import {
    Search,
    ChevronDown,
    TrendingUp,
    FileText,
    Table,
    Users,
} from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
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
                    <button className="flex items-center gap-2 bg-[#111827] px-4 py-2.5 rounded-xl border border-blue-500/30 text-blue-400 text-sm font-semibold whitespace-nowrap">
                        Grupo: Clase A <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <button className="flex items-center gap-2 bg-[#111827] px-4 py-2.5 rounded-xl border border-white/5 text-gray-300 text-sm font-medium whitespace-nowrap">
                        Tema: Álgebra <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <button className="flex items-center gap-2 bg-[#111827] px-4 py-2.5 rounded-xl border border-white/5 text-gray-300 text-sm font-medium whitespace-nowrap">
                        Etapa <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
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
                                    <span className="text-5xl font-black text-blue-500">82.4%</span>
                                    <span className="text-slate-500 font-bold text-sm tracking-tight">Tasa de Retención</span>
                                </div>
                            </div>
                            <div className="bg-emerald-500/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-emerald-500/10">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-400 text-xs font-black">+2.4%</span>
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
                            <div className="text-center w-1/4">
                                <span className="block opacity-60">Etapa 1</span>
                                <span className="text-white">Intro</span>
                            </div>
                            <div className="text-center w-1/4">
                                <span className="block opacity-60">Etapa 2</span>
                                <span className="text-white">Básico</span>
                            </div>
                            <div className="text-center w-1/4">
                                <span className="block opacity-60 text-blue-500">Etapa 3</span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-black mb-4 uppercase tracking-widest text-white/80">Exportar Reportes</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-[#111827] p-6 rounded-[32px] border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#1E293B] transition-all group active:scale-95">
                                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                    <FileText className="w-6 h-6 text-red-500" />
                                </div>
                                <div className="text-center">
                                    <span className="block font-black text-white text-xs uppercase tracking-widest">Descargar PDF</span>
                                    <span className="block text-slate-500 text-[10px] mt-1 font-bold">Resumen Visual</span>
                                </div>
                            </button>

                            <button className="bg-[#111827] p-6 rounded-[32px] border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#1E293B] transition-all group active:scale-95">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                    <Table className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div className="text-center">
                                    <span className="block font-black text-white text-xs uppercase tracking-widest">Exportar Excel</span>
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
                                    <span className="text-3xl font-black text-white">42m</span>
                                    <span className="text-slate-500 font-bold text-xs">por lección</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-3/4 rounded-full" />
                                </div>
                            </div>

                            <div className="bg-[#111827] p-6 rounded-[32px] border border-white/5">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Tasa de Fallos</p>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-3xl font-black text-red-500">12.5%</span>
                                    <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Etapa 3</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 w-[12.5%] rounded-full" />
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
                        <Link href="/students" className="text-blue-500 text-[10px] font-black uppercase tracking-widest hover:text-blue-400 transition-colors">
                            Ver todos los alumnos
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black text-sm border-2 border-white/5 shadow-xl">MC</div>
                                <div>
                                    <p className="font-black text-white text-base">Marcus Chen</p>
                                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Hace 2 horas</p>
                                </div>
                            </div>
                            <span className="bg-red-500/10 text-red-500 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border border-red-500/10">
                                RIESGO
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-black text-sm border-2 border-white/5 shadow-xl">SJ</div>
                                <div>
                                    <p className="font-black text-white text-base">Sarah Jenkins</p>
                                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Hace 5 horas</p>
                                </div>
                            </div>
                            <span className="bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border border-orange-500/10">
                                RETRASO
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
