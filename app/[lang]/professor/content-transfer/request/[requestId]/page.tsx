"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Info, FolderOpen, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface Topic {
    id: string;
    name: string;
}

interface TransferRequest {
    id: string;
    senderName: string;
    senderDepartment: string;
    senderAvatar: string;
    senderOnline: boolean;
    packageTitle: string;
    packageDescription: string;
    packageSize: string;
    fileCount: number;
    topics: Topic[];
    hasBeenSent: boolean;
}

export default function TransferRequestDetailsPage({ params }: { params: { requestId: string, lang: string } }) {
    const t = useTranslations('ContentTransfer');
    const router = useRouter();

    // Mock data - in real app, fetch based on params.requestId
    const request: TransferRequest = {
        id: params.requestId,
        senderName: 'Prof. Carlos Ruiz',
        senderDepartment: 'Departamento de Matemáticas',
        senderAvatar: '/avatars/carlos-ruiz.jpg',
        senderOnline: true,
        packageTitle: 'Módulos de Álgebra II',
        packageDescription: 'Este paquete incluye materiales curriculares, presentaciones interactivas y rúbricas de evaluación estandarizadas.',
        packageSize: '12.4 MB',
        fileCount: 8,
        topics: [
            { id: '1', name: 'Ecuaciones Lineales' },
            { id: '2', name: 'Funciones Cuadráticas' }
        ],
        hasBeenSent: true
    };

    const handleAccept = () => {
        // Handle accept logic
        console.log('Transfer accepted');
    };

    const handleReject = () => {
        // Handle reject logic
        console.log('Transfer rejected');
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-sans pb-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/10 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-900/10 blur-[120px] pointer-events-none" />

            <div className="max-w-md mx-auto p-6 relative z-10">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-center">
                        {t('requestDetails.title')}
                    </h1>
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <Info className="w-6 h-6" />
                    </button>
                </header>

                {/* Sender Profile Card */}
                <div className="bg-gradient-to-br from-[#0f1629] to-[#0B1120] border border-blue-900/30 rounded-3xl p-6 mb-6 shadow-xl shadow-black/20 text-center">
                    {/* Avatar */}
                    <div className="relative inline-block mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 p-1">
                            <div className="w-full h-full rounded-full bg-[#1a2332] flex items-center justify-center overflow-hidden">
                                {/* Placeholder avatar - replace with actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-3xl font-bold">
                                    CR
                                </div>
                            </div>
                        </div>
                        {/* Online indicator */}
                        {request.senderOnline && (
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-[#0B1120] rounded-full" />
                        )}
                    </div>

                    {/* Sender Info */}
                    <h2 className="text-2xl font-bold text-white mb-1">
                        {request.senderName}
                    </h2>
                    <p className="text-slate-400 text-sm mb-4">
                        {request.senderDepartment}
                    </p>

                    {/* Status Badge */}
                    {request.hasBeenSent && (
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                            {t('requestDetails.sentBadge')}
                        </div>
                    )}
                </div>

                {/* Transfer Package Card */}
                <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-950/10 border border-emerald-700/30 rounded-3xl p-6 mb-6 shadow-xl shadow-black/20">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                            <FolderOpen className="w-8 h-8 text-emerald-400" />
                        </div>
                    </div>

                    {/* Package Title */}
                    <h3 className="text-xl font-bold text-white text-center mb-2">
                        {t('requestDetails.packageTitle')}
                    </h3>
                    <p className="text-blue-400 text-center text-sm font-medium mb-4">
                        {request.packageTitle}
                    </p>

                    {/* Package Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 text-center">
                        {request.packageDescription}
                    </p>

                    {/* Package Stats */}
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-400 mb-6">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                            <span>{request.packageSize}</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-600 rounded-full" />
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                            <span>{t('requestDetails.fileCount', { count: request.fileCount })}</span>
                        </div>
                    </div>

                    {/* Topics Included Section */}
                    <div className="bg-[#0B1120]/50 rounded-2xl p-4 border border-white/5">
                        <h4 className="text-white font-bold text-sm mb-3">
                            {t('requestDetails.topicsIncluded')}
                        </h4>
                        <div className="space-y-2">
                            {request.topics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className="flex items-center gap-3 bg-[#151b2d] rounded-xl p-3 border border-white/5"
                                >
                                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                        <Check className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-slate-200 text-sm font-medium flex-1">
                                        {topic.name}
                                    </span>
                                    <button className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                                        <ArrowLeft className="w-4 h-4 text-slate-500 rotate-180" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleAccept}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <Check className="w-5 h-5" />
                        {t('requestDetails.acceptButton')}
                    </button>
                    <button
                        onClick={handleReject}
                        className="w-full bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-medium py-4 rounded-2xl transition-all"
                    >
                        {t('requestDetails.rejectButton')}
                    </button>
                </div>

                {/* Bottom Divider */}
                <div className="mt-8 flex justify-center">
                    <div className="w-32 h-1 bg-slate-800 rounded-full" />
                </div>
            </div>
        </div>
    );
}
