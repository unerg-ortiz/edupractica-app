"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Search, Check, ArrowRight } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import clsx from 'clsx';

interface Material {
    id: string;
    title: string;
    fileCount: number;
    description: string;
    category: string;
}

interface Recipient {
    id: string;
    name: string;
    email: string;
    initials: string;
}

export default function InitiateContentTransferPage() {
    const t = useTranslations('ContentTransfer');
    const router = useRouter();
    const params = useParams();

    const [currentStep, setCurrentStep] = useState<1 | 2>(1);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data - in real app, fetch from API
    const materials: Material[] = [
        {
            id: '1',
            title: 'Algebra II - Unidad 1',
            fileCount: 12,
            description: 'Funciones Cuadráticas',
            category: 'DEPTO. DE MATEMÁTICAS'
        },
        {
            id: '2',
            title: 'Conceptos Básicos de Geometría',
            fileCount: 8,
            description: 'Teoremas y Demostraciones',
            category: 'DEPTO. DE MATEMÁTICAS'
        },
        {
            id: '3',
            title: 'Cálculo: Límites',
            fileCount: 15,
            description: 'Preparación AP 2024',
            category: 'DEPTO. DE MATEMÁTICAS'
        }
    ];

    const evaluations: Material[] = [
        {
            id: '4',
            title: 'Banco de Preguntas del Examen Final',
            fileCount: 200,
            description: 'PDF Exportado',
            category: 'EVALUACIONES'
        }
    ];

    const recipients: Recipient[] = [
        {
            id: '1',
            name: 'Sarah Richardson',
            email: 'srichardson@academy.edu',
            initials: 'SR'
        },
        {
            id: '2',
            name: 'James Miller',
            email: 'jmiller@academy.edu',
            initials: 'JM'
        }
    ];

    const toggleMaterial = (id: string) => {
        setSelectedMaterials(prev =>
            prev.includes(id)
                ? prev.filter(materialId => materialId !== id)
                : [...prev, id]
        );
    };

    const handleNext = () => {
        if (currentStep === 1 && selectedMaterials.length > 0) {
            setCurrentStep(2);
        }
    };

    const handleSendRequest = () => {
        if (selectedRecipient) {
            // Handle send request logic
            console.log('Sending request to:', selectedRecipient);
            console.log('Materials:', selectedMaterials);
            router.push(`/${params.lang}/professor/content-transfer/success`);
        }
    };

    const renderMaterialCard = (material: Material) => {
        const isSelected = selectedMaterials.includes(material.id);

        return (
            <div
                key={material.id}
                onClick={() => toggleMaterial(material.id)}
                className={clsx(
                    "relative bg-[#151b2d] rounded-2xl p-4 border transition-all cursor-pointer",
                    isSelected
                        ? "border-blue-500 bg-blue-500/5"
                        : "border-white/5 hover:border-white/10"
                )}
            >
                {/* Checkbox */}
                <div className="absolute top-4 right-4">
                    <div
                        className={clsx(
                            "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                            isSelected
                                ? "bg-blue-600 border-blue-600"
                                : "border-slate-600 bg-transparent"
                        )}
                    >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                </div>

                {/* Content */}
                <div className="pr-10">
                    <h4 className="text-white font-bold text-base mb-1">
                        {material.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-2">
                        {material.fileCount} {t('initiate.archives')} • {material.description}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-sans pb-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/10 blur-[100px] pointer-events-none" />

            <div className="max-w-md mx-auto p-6 relative z-10">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => currentStep === 2 ? setCurrentStep(1) : router.back()}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-center">
                        {t('initiate.title')}
                    </h1>
                    <div className="w-10" /> {/* Spacer for centering */}
                </header>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className={clsx(
                        "h-1 rounded-full transition-all",
                        currentStep === 1 ? "w-12 bg-blue-600" : "w-8 bg-slate-700"
                    )} />
                    <div className={clsx(
                        "h-1 rounded-full transition-all",
                        currentStep === 2 ? "w-12 bg-blue-600" : "w-8 bg-slate-700"
                    )} />
                </div>

                {/* Step 1: Select Materials */}
                {currentStep === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Step Title */}
                        <div className="mb-6">
                            <div className="text-blue-400 text-xs font-bold tracking-wider uppercase mb-2">
                                {t('initiate.step1Label')}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {t('initiate.step1Title')}
                            </h2>
                            <p className="text-slate-400 text-sm">
                                {t('initiate.step1Description')}
                            </p>
                        </div>

                        {/* Department Materials */}
                        <div className="mb-6">
                            <h3 className="text-slate-500 text-xs font-bold tracking-wider uppercase mb-3">
                                {materials[0].category}
                            </h3>
                            <div className="space-y-3">
                                {materials.map(material => renderMaterialCard(material))}
                            </div>
                        </div>

                        {/* Evaluations */}
                        <div className="mb-8">
                            <h3 className="text-slate-500 text-xs font-bold tracking-wider uppercase mb-3">
                                {t('initiate.evaluationsLabel')}
                            </h3>
                            <div className="space-y-3">
                                {evaluations.map(material => renderMaterialCard(material))}
                            </div>
                        </div>

                        {/* Step 2 Preview */}
                        <div className="bg-gradient-to-br from-[#0f1629] to-[#0B1120] border border-blue-900/30 rounded-3xl p-6 mb-6">
                            <h3 className="text-white font-bold text-lg mb-2">
                                {t('initiate.step2Title')}
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                                {t('initiate.step2Preview')}
                            </p>
                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                <Search className="w-5 h-5" />
                                <span>{t('initiate.searchPlaceholder')}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => router.back()}
                                className="flex-1 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-medium py-4 rounded-2xl transition-all border border-slate-700"
                            >
                                {t('initiate.saveDraft')}
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={selectedMaterials.length === 0}
                                className={clsx(
                                    "flex-1 font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2",
                                    selectedMaterials.length > 0
                                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                {t('initiate.nextStep')}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Search Recipient */}
                {currentStep === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        {/* Step Title */}
                        <div className="mb-6">
                            <div className="text-blue-400 text-xs font-bold tracking-wider uppercase mb-2">
                                {t('initiate.step2Label')}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {t('initiate.step2Title')}
                            </h2>
                            <p className="text-slate-400 text-sm">
                                {t('initiate.step2Description')}
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={t('initiate.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#151b2d] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            />
                        </div>

                        {/* Recipients List */}
                        <div className="space-y-3 mb-8">
                            {recipients.map((recipient) => {
                                const isSelected = selectedRecipient === recipient.id;

                                return (
                                    <div
                                        key={recipient.id}
                                        className={clsx(
                                            "flex items-center gap-4 bg-[#151b2d] rounded-2xl p-4 border transition-all",
                                            isSelected
                                                ? "border-blue-500 bg-blue-500/5"
                                                : "border-white/5"
                                        )}
                                    >
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                                            {recipient.initials}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white font-bold text-base truncate">
                                                {recipient.name}
                                            </h4>
                                            <p className="text-slate-400 text-sm truncate">
                                                {recipient.email}
                                            </p>
                                        </div>

                                        {/* Select Button */}
                                        <button
                                            onClick={() => setSelectedRecipient(recipient.id)}
                                            className={clsx(
                                                "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all",
                                                isSelected
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                                            )}
                                        >
                                            {t('initiate.selectButton')}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="flex-1 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-medium py-4 rounded-2xl transition-all border border-slate-700"
                            >
                                {t('initiate.saveDraft')}
                            </button>
                            <button
                                onClick={handleSendRequest}
                                disabled={!selectedRecipient}
                                className={clsx(
                                    "flex-1 font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2",
                                    selectedRecipient
                                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                {t('initiate.nextStep')}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Bottom Divider */}
                <div className="mt-8 flex justify-center">
                    <div className="w-32 h-1 bg-slate-800 rounded-full" />
                </div>
            </div>
        </div>
    );
}
