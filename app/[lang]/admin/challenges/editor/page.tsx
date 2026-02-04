"use client";

import React, { useState } from 'react';
import {
    X,
    Lightbulb,
    Eye,
    ChevronLeft,
    MoreHorizontal,
    Pencil,
    Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ChallengeEditorPage() {
    const params = useParams();
    const lang = params.lang as string;
    const [showModal, setShowModal] = useState(true);

    // Mock data for the background interface
    const buckets = [
        { id: 1, name: 'Correr', color: 'from-orange-500/20 to-orange-900/20', borderColor: 'border-orange-500/30' },
        { id: 2, name: 'Saltar', color: 'from-green-500/20 to-green-900/20', borderColor: 'border-green-500/30' },
    ];

    return (
        <div className="min-h-screen bg-[#050511] text-white font-sans relative overflow-hidden">

            {/* --- Background Content (Blurred when modal is open) --- */}
            <div className={`transition-all duration-300 ${showModal ? 'filter blur-sm brightness-50' : ''}`}>

                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050511]/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Link href={`/${lang}/admin`} className="p-2 hover:bg-white/10 rounded-full transition">
                            <X className="w-5 h-5 text-gray-400" />
                        </Link>
                        <h1 className="text-lg font-bold text-gray-200">Editor de Reto de Clasificación</h1>
                    </div>
                    <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 flex items-center gap-2">
                        Vista Previa <Eye className="w-4 h-4" />
                    </button>
                </header>

                {/* Main Content */}
                <main className="p-8 max-w-5xl mx-auto">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold mb-2">Organizar Elementos</h2>
                        <p className="text-gray-400">Arrastra y suelta los elementos en sus categorías correctas.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-6 border-b border-white/10 mb-8">
                        <button className="pb-3 border-b-2 border-blue-500 text-blue-400 font-medium">Todos los Contenedores</button>
                        <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-300 transition">Banco de Items</button>
                    </div>

                    {/* Buckets Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {buckets.map((bucket) => (
                            <div key={bucket.id} className={`bg-[#151525] rounded-2xl p-6 border ${bucket.borderColor} relative min-h-[300px]`}>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-lg">{bucket.name}</h3>
                                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition text-blue-400">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Placeholder Visual for Bucket */}
                                <div className={`w-full h-32 bg-gradient-to-b ${bucket.color} rounded-xl mb-4 opacity-50`} />

                                {/* Drop Zone Placeholder */}
                                <div className="border-2 border-dashed border-white/10 rounded-xl h-24 flex items-center justify-center text-gray-600 text-sm">
                                    Soltar items aquí
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* --- Modal / Bottom Sheet --- */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
                    {/* Backdrop click to close (optional, but good UX) */}
                    <div className="absolute inset-0 z-0" onClick={() => setShowModal(false)} />

                    {/* Modal Card */}
                    <div className="bg-[#10101C] w-full max-w-lg rounded-3xl z-10 p-6 shadow-2xl border border-white/10 animate-in slide-in-from-bottom-10 fade-in duration-300">

                        {/* Drag Handle (Mobile aesthetic) */}
                        <div className="w-12 h-1.5 bg-gray-700/50 rounded-full mx-auto mb-6" />

                        {/* Header Section */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Lightbulb className="w-6 h-6 text-blue-500 fill-blue-500/20" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Pistas y Retroalimentación</h2>
                                <p className="text-gray-400 text-sm">Mensajes personalizados para "Manzana"</p>
                            </div>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-6">

                            {/* Failure Message */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-300">Mensaje de Fallo</label>
                                <div className="bg-[#1A1A2E] border border-blue-500/30 rounded-xl p-4 shadow-[0_0_0_1px_rgba(59,130,246,0.1)]">
                                    <textarea
                                        className="w-full bg-transparent border-none text-gray-200 placeholder-gray-500 focus:ring-0 resize-none text-sm leading-relaxed"
                                        rows={3}
                                        defaultValue="¡Ups! No es del todo correcto. Recuerda, un sustantivo es una persona, lugar o cosa. ¿Es 'Manzana' una acción?"
                                    />
                                </div>
                            </div>

                            {/* Success Hint */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-300">Pista de Éxito (Opcional)</label>
                                <div className="bg-[#1A1A2E] border border-white/5 rounded-xl p-4">
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-none text-gray-200 placeholder-gray-600 focus:ring-0 text-sm"
                                        placeholder="¡Buen trabajo! Una manzana es una fruta."
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <button
                                onClick={() => setShowModal(false)}
                                className="py-3 px-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-lg shadow-blue-500/20"
                            >
                                Aplicar Cambios
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
