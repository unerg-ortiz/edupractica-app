"use client";

import React from 'react';
import { Trophy, Star, Award, Target } from 'lucide-react';

export default function AchievementsPage() {
    return (
        <div className="min-h-screen bg-[#050511] text-white pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="space-y-2 mb-8">
                    <h1 className="text-4xl font-black tracking-tight">Logros</h1>
                    <p className="text-slate-400 text-lg">Tus logros y progreso general</p>
                </div>

                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-6">
                        <Trophy className="w-12 h-12 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-300 mb-2">Próximamente</h2>
                    <p className="text-slate-500 text-center max-w-md">
                        Esta sección estará disponible pronto. Aquí podrás ver todos tus logros, medallas y reconocimientos.
                    </p>
                </div>
            </div>
        </div>
    );
}
