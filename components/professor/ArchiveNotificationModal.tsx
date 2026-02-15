"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Archive, AlertTriangle, ArrowRight, X } from 'lucide-react';
import clsx from 'clsx';

interface ArchiveNotificationProps {
    isOpen: boolean;
    onClose: () => void;
    onProceedWithArchive: () => void;
    onInitiateTransfer: () => void;
    materialCount: number;
}

export default function ArchiveNotificationModal({
    isOpen,
    onClose,
    onProceedWithArchive,
    onInitiateTransfer,
    materialCount
}: ArchiveNotificationProps) {
    const t = useTranslations('ContentTransfer.archive');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="max-w-md w-full bg-gradient-to-br from-[#0f1629] to-[#0B1120] border border-amber-900/30 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-amber-900/30 p-6">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-amber-600/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">
                                {t('title')}
                            </h2>
                            <p className="text-amber-400 text-sm font-medium">
                                {t('subtitle', { count: materialCount })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        {t('description')}
                    </p>

                    {/* Archive Info Card */}
                    <div className="bg-[#0B1120]/50 border border-white/5 rounded-2xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Archive className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">
                                    {t('archiveInfo.title')}
                                </h3>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    {t('archiveInfo.description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={onInitiateTransfer}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {t('transferButton')}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onProceedWithArchive}
                            className="w-full bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-medium py-4 rounded-2xl transition-all border border-slate-700"
                        >
                            {t('archiveButton')}
                        </button>
                    </div>

                    {/* Warning Note */}
                    <div className="mt-4 flex items-start gap-2 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-amber-400 text-xs leading-relaxed">
                            {t('warning')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
