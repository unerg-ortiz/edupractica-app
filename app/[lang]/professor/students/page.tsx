"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Filter, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import clsx from 'clsx';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { users as userService } from '@/lib/api';
import { useEffect } from 'react';

interface Student {
    id: string;
    full_name: string;
    email: string;
    initials: string;
    is_blocked: boolean;
    is_at_risk?: boolean; // Added for filtering
}

export default function StudentsPage() {
    const t = useTranslations('Users');
    const { lang } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const filter = searchParams.get('filter');

    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        setIsLoading(true);
        try {
            const data = await userService.getStudents();
            setStudents(data.map((s: any, index: number) => ({
                id: s.id.toString(),
                full_name: s.full_name || 'Sin Nombre',
                email: s.email,
                initials: (s.full_name || 'SN').split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2),
                is_blocked: s.is_blocked,
                is_at_risk: index < 2 // Mocking some students at risk for the demonstration
            })));
        } catch (error) {
            console.error("Error loading students:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === 'alert') {
            return matchesSearch && student.is_at_risk;
        }

        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#080C14] text-white font-sans pb-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-8 gap-6">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Mis <span className="text-blue-500">Estudiantes</span></h1>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest opacity-60">Gestiona los accesos y revisa el progreso de tus alumnos</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar alumnos..."
                            className="bg-[#111827] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-slate-600 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all font-bold"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="bg-[#111827] border border-white/5 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E293B] transition-all">
                        <Filter className="w-5 h-5" />
                    </button>
                    <div className="hidden lg:flex w-10 h-10 rounded-xl bg-blue-600 items-center justify-center shadow-lg shadow-blue-600/20">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                </div>
            </header>

            <main className="px-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Alumnos', value: students.length.toString(), grow: '+0%', color: 'text-white' },
                        { label: 'Activos', value: students.filter(s => !s.is_blocked).length.toString(), color: 'text-emerald-400' },
                        { label: 'Bloqueados', value: students.filter(s => s.is_blocked).length.toString(), color: 'text-red-400' },
                        { label: 'Nuevos (Hoy)', value: '0', color: 'text-blue-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#0F172A] p-6 rounded-[32px] border border-white/5 relative overflow-hidden group hover:border-blue-500/20 transition-all">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <span className={clsx("text-3xl font-black", stat.color)}>{stat.value}</span>
                                {stat.grow && <span className="text-emerald-500 text-[10px] font-black bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/10">{stat.grow}</span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Users Table */}
                <div className="bg-[#0F172A] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="hidden md:grid grid-cols-[2fr,1fr,2fr,1fr,1fr] gap-4 p-6 border-b border-white/5 bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <div>ESTUDIANTE</div>
                        <div>ID</div>
                        <div>CORREO</div>
                        <div>ESTADO</div>
                        <div className="text-right">ACCIONES</div>
                    </div>

                    {/* Body */}
                    <div className="divide-y divide-white/5">
                        {isLoading ? (
                            <div className="p-20 text-center">
                                <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Cargando Estudiantes...</p>
                            </div>
                        ) : filteredStudents.length === 0 ? (
                            <div className="p-20 text-center">
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No se encontraron estudiantes</p>
                            </div>
                        ) : filteredStudents.map(student => (
                            <div key={student.id} className="grid grid-cols-1 md:grid-cols-[2fr,1fr,2fr,1fr,1fr] gap-4 p-6 items-center hover:bg-white/[0.02] transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-black text-sm shrink-0 border-2 border-white/5 group-hover:border-blue-500/30 transition-all shadow-xl">
                                        {student.initials}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-black text-white text-base truncate">{student.full_name}</p>
                                        <p className="md:hidden text-slate-500 text-[10px] uppercase font-bold tracking-widest">#{student.id}</p>
                                    </div>
                                </div>

                                <div className="hidden md:block text-slate-500 text-sm font-bold">#{student.id}</div>
                                <div className="text-slate-400 text-sm truncate opacity-70">{student.email}</div>

                                <div className="flex items-center">
                                    <span className={clsx(
                                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest border uppercase",
                                        !student.is_blocked
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                                            : "bg-red-500/10 text-red-400 border-red-500/10"
                                    )}>
                                        <div className={clsx("w-1.5 h-1.5 rounded-full", !student.is_blocked ? "bg-emerald-500" : "bg-red-500")} />
                                        {!student.is_blocked ? 'ACTIVO' : 'BLOQUEADO'}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <button
                                        onClick={() => router.push(`/${lang}/professor/students/${student.id}`)}
                                        className="w-full md:w-auto bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-blue-500/10"
                                    >
                                        Ver Perfil
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="p-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                            Mostrando {filteredStudents.length} de 1,284 alumnos
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-500 transition-all">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {[1, 2, 3].map(p => (
                                <button key={p} className={clsx(
                                    "w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs transition-all",
                                    p === 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-white/10 text-slate-500"
                                )}>
                                    {p}
                                </button>
                            ))}
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-500 transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
