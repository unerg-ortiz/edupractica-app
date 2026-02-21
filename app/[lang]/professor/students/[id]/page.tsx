"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ChevronLeft,
    User,
    Mail,
    BookOpen,
    Trophy,
    Activity,
    Shield,
    ShieldAlert,
    Clock
} from 'lucide-react';
import clsx from 'clsx';
import { users as userService } from '@/lib/api';

interface StudentProfile {
    id: string;
    full_name: string;
    email: string;
    is_blocked: boolean;
    created_at?: string;
    progress?: {
        completed: number;
        total: number;
        last_activity: string;
    };
}

export default function StudentProfilePage() {
    const { lang, id } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [student, setStudent] = useState<StudentProfile | null>(null);

    useEffect(() => {
        const fetchStudent = async () => {
            setIsLoading(true);
            try {
                // Since there is no specific getStudentById, used getStudents and filtered for now
                // In a real scenario, should have /users/{id}
                const allStudents = await userService.getStudents();
                const found = allStudents.find((s: any) => s.id.toString() === id);

                if (found) {
                    setStudent({
                        id: found.id.toString(),
                        full_name: found.full_name || 'Sin Nombre',
                        email: found.email,
                        is_blocked: found.is_blocked,
                        created_at: '2024-01-15',
                        progress: {
                            completed: 12,
                            total: 45,
                            last_activity: 'Hace 2 horas'
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching student:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (!student) {
        return (
            <div className="min-h-screen bg-[#080C14] flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-black text-white mb-4">Estudiante no encontrado</h2>
                <button
                    onClick={() => router.back()}
                    className="text-blue-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2"
                >
                    <ChevronLeft className="w-4 h-4" /> Volver atrás
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080C14] text-white font-sans pb-20">
            {/* Header / Nav */}
            <div className="p-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-8"
                >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-500 transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="font-black text-[10px] uppercase tracking-widest">Volver a Estudiantes</span>
                </button>

                {/* Profile Header */}
                <div className="bg-[#0F172A] rounded-[40px] border border-white/5 p-8 lg:p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />

                    <div className="flex flex-col lg:flex-row gap-8 lg:items-center relative z-10">
                        <div className="w-32 h-32 rounded-3xl bg-slate-800 flex items-center justify-center border-4 border-white/5 shadow-2xl overflow-hidden relative group">
                            <User className="w-12 h-12 text-slate-600 group-hover:text-blue-500 transition-colors" />
                            {student.is_blocked && (
                                <div className="absolute inset-0 bg-red-600/20 backdrop-blur-[2px] flex items-center justify-center">
                                    <ShieldAlert className="w-10 h-10 text-red-500" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-4xl lg:text-5xl font-black tracking-tight">{student.full_name}</h1>
                                <span className={clsx(
                                    "px-4 py-1.5 rounded-xl text-[10px] font-black tracking-[0.2em] border uppercase",
                                    !student.is_blocked
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                                        : "bg-red-500/10 text-red-400 border-red-500/10"
                                )}>
                                    {!student.is_blocked ? 'ACTIVO' : 'BLOQUEADO'}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-6 text-slate-400 font-bold text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    {student.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-600" />
                                    Registrado: {student.created_at}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 lg:flex-none px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95">
                                Mensaje
                            </button>
                            <button className={clsx(
                                "flex-1 lg:flex-none px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border",
                                !student.is_blocked
                                    ? "bg-red-600/10 text-red-500 border-red-500/20 hover:bg-red-600 hover:text-white"
                                    : "bg-emerald-600/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-600 hover:text-white"
                            )}>
                                {!student.is_blocked ? 'Restringir Acceso' : 'Habilitar Acceso'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Activity Card */}
                    <div className="bg-[#0F172A] rounded-[40px] border border-white/5 p-8 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                                <Activity className="w-6 h-6 text-blue-500" />
                            </div>
                            <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">Actividad</span>
                        </div>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">Última sesión</p>
                        <h3 className="text-3xl font-black text-white">{student.progress?.last_activity}</h3>
                        <div className="mt-8 flex items-end gap-1 h-12">
                            {[40, 70, 45, 90, 65, 80, 50, 85, 60, 95].map((h, i) => (
                                <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm group-hover:bg-blue-500/40 transition-all duration-500" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-[#0F172A] rounded-[40px] border border-white/5 p-8 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">Rendimiento</span>
                        </div>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">Etapas Completadas</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-5xl font-black text-emerald-500">{student.progress?.completed}</h3>
                            <span className="text-slate-500 font-bold text-lg">/ {student.progress?.total}</span>
                        </div>
                        <div className="mt-8 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000"
                                style={{ width: `${(student.progress!.completed / student.progress!.total) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Topics Card */}
                    <div className="bg-[#0F172A] rounded-[40px] border border-white/5 p-8 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-purple-500" />
                            </div>
                            <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">Temas</span>
                        </div>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-3">Intereses principales</p>
                        <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest">
                            {['Álgebra', 'Geometría', 'Historia', 'Ciencias'].map(tag => (
                                <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="mt-10 pt-6 border-t border-white/5">
                            <button className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-blue-400 transition-colors w-full text-center">
                                Ver reporte completo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
