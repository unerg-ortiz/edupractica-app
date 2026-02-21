"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Trash2 } from 'lucide-react';
import clsx from 'clsx';

export default function ProfilePage() {
    const t = useTranslations('Profile');
    const [deleteInput, setDeleteInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Mock delete function
    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("Cuenta eliminada correctamente (Simulación)");
        setIsDeleting(false);
        setIsModalOpen(false);
        // Redirect logic would go here
    };

    const isDeleteEnabled = deleteInput === 'BORRAR';

    return (
        <div className="min-h-screen bg-[#050511] text-white p-4 font-sans selection:bg-red-500 selection:text-white">
            <div className="max-w-md mx-auto space-y-8 py-8">{/* Account Configuration Section */}
                <section>
                    <h2 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">
                        {t('configuration')}
                    </h2>
                    <div className="space-y-4">
                        <div className="h-14 bg-[#1a1d2d] rounded-2xl border border-white/5 w-full animate-pulse opacity-50" />
                        <div className="h-14 bg-[#1a1d2d] rounded-2xl border border-white/5 w-full animate-pulse opacity-50" />
                    </div>
                </section>

                {/* Notifications Section */}
                <section>
                    <h2 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">
                        {t('notifications')}
                    </h2>
                    <div className="h-14 bg-[#1a1d2d] rounded-2xl border border-white/5 w-full animate-pulse opacity-50" />
                </section>

                {/* Danger Zone */}
                <section className="mt-12">
                    <div className="flex items-center gap-2 mb-4 text-red-500">
                        <AlertTriangle className="w-4 h-4" />
                        <h2 className="text-xs font-bold uppercase tracking-wider">
                            {t('dangerZone.title')}
                        </h2>
                    </div>

                    <div className="bg-[#151216] rounded-3xl border border-red-500/20 p-6 relative overflow-hidden group">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <p className="text-sm text-gray-400 leading-relaxed mb-8 relative z-10">
                            {t('dangerZone.warning')}
                        </p>

                        <div className="bg-[#1a1d2d] rounded-2xl p-5 mb-6 border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-1">
                                {t('dangerZone.cardTitle')}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {t('dangerZone.cardSubtitle')}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 mb-2 block">
                                    {t('dangerZone.inputLabel')}
                                </label>
                                <input
                                    type="text"
                                    value={deleteInput}
                                    onChange={(e) => setDeleteInput(e.target.value)}
                                    placeholder={t('dangerZone.inputPlaceholder')}
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-500/50 transition-colors uppercase tracking-widest placeholder:normal-case font-mono"
                                />
                            </div>

                            <button
                                disabled={!isDeleteEnabled}
                                onClick={() => setIsModalOpen(true)}
                                className={clsx(
                                    "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg",
                                    isDeleteEnabled
                                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-500/20 hover:shadow-red-500/30 hover:scale-[1.02]"
                                        : "bg-[#1a1d2d] text-gray-600 cursor-not-allowed"
                                )}
                            >
                                <Trash2 className="w-5 h-5" />
                                {t('dangerZone.deleteButton')}
                            </button>

                            <button className="w-full py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors">
                                {t('dangerZone.keepAccount')}
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="bg-[#1a1d2d] w-full max-w-md rounded-3xl p-8 relative z-10 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 shadow-2xl border border-white/5">
                        <div className="flex flex-col items-center text-center">
                            {/* Icon */}
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-red-500/20">
                                <AlertTriangle className="w-10 h-10 text-red-500" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-4">
                                {t('modal.title')}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                {t('modal.description')}
                            </p>

                            {/* Checkbox */}
                            <label className="flex items-start gap-4 p-4 bg-[#0f111a] rounded-xl border border-white/5 cursor-pointer hover:border-white/10 transition-colors mb-8 text-left">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isConfirmed}
                                        onChange={(e) => setIsConfirmed(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-6 h-6 border-2 border-gray-600 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400 select-none">
                                    {t('modal.checkbox')}
                                </span>
                            </label>

                            {/* Actions */}
                            <div className="w-full space-y-3">
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={!isConfirmed || isDeleting}
                                    className={clsx(
                                        "w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg",
                                        isConfirmed && !isDeleting
                                            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                                            : "bg-[#0f111a] text-gray-600 cursor-not-allowed"
                                    )}
                                >
                                    {isDeleting ? "..." : t('modal.confirmButton')}
                                </button>

                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isDeleting}
                                    className="w-full py-3 text-sm text-gray-500 hover:text-white transition-colors"
                                >
                                    {t('modal.cancelButton')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
