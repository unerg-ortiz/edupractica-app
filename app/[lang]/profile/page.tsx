"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Trash2, User, Mail, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { users } from '@/lib/api';

export default function ProfilePage() {
    const t = useTranslations('Profile');

    // State for user data
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updSuccess, setUpdSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for account deletion
    const [deleteInput, setDeleteInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await users.getMe();
                setFullName(data.full_name || '');
                setEmail(data.email || '');
            } catch (err: any) {
                console.error("Error fetching user data:", err);
                setError(err.message || "Error al cargar datos");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation: Passwords must match
        if (password && password !== confirmPassword) {
            setError(t('passwordsDontMatch'));
            return;
        }

        setIsUpdating(true);
        setUpdSuccess(false);
        setError(null);

        try {
            const data: any = { full_name: fullName, email };
            if (password) data.password = password;

            await users.updateMe(data);

            // Update localStorage
            localStorage.setItem('user_name', fullName);
            localStorage.setItem('user_email', email);

            // Trigger storage event for other tabs/components
            window.dispatchEvent(new Event('storage'));

            setUpdSuccess(true);
            setPassword('');
            setConfirmPassword('');

            // Refresh page to ensure all components see the change
            // Alternatively, use a context or state management, but refresh is foolproof
            setTimeout(() => {
                setUpdSuccess(false);
                window.location.reload();
            }, 1000);
        } catch (err: any) {
            console.error("Error updating profile:", err);
            setError(err.message || "Error al actualizar perfil");
        } finally {
            setIsUpdating(false);
        }
    };

    // Actual delete function
    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            // Reusing the access token endpoint or a dedicated one would be better
            // but the backend has DELETE /me for this.
            // However, the user requested deactivation logic usually.
            // I'll stick to the backend's DELETE /me which I just fixed.
            await users.deleteMe();

            // Logout and redirect
            localStorage.removeItem('token');
            window.location.href = '/';
        } catch (err: any) {
            console.error("Error deleting account:", err);
            setError(err.message || "Error al eliminar cuenta");
            setIsDeleting(false);
            setIsModalOpen(false);
        }
    };

    const isDeleteEnabled = deleteInput === 'BORRAR';

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050511] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050511] text-white p-4 font-sans selection:bg-red-500 selection:text-white">
            <div className="max-w-md mx-auto space-y-8 py-8">

                {/* Account Configuration Section */}
                <section>
                    <h2 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">
                        {t('configuration')}
                    </h2>

                    <form onSubmit={handleUpdateProfile} className="space-y-4" autoComplete="off">
                        {/* Status Messages */}
                        {updSuccess && (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-1">
                                <CheckCircle2 className="w-4 h-4" />
                                {t('updateSuccess')}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-1">
                                <AlertTriangle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Full Name Input */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder={t('fullNameLabel')}
                                    autoComplete="off"
                                    className="w-full bg-[#1a1d2d] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('emailLabel')}
                                    autoComplete="off"
                                    className="w-full bg-[#1a1d2d] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                />
                            </div>

                            {/* Password Input (Optional) */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t('passwordLabel')}
                                    autoComplete="new-password"
                                    className="w-full bg-[#1a1d2d] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                />
                            </div>

                            {/* Confirm Password Input (Conditional) */}
                            {password.length > 0 && (
                                <div className="relative group animate-in fade-in zoom-in duration-300">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder={t('confirmPasswordLabel')}
                                        autoComplete="new-password"
                                        className="w-full bg-[#1a1d2d] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                            >
                                {isUpdating && <Loader2 className="w-5 h-5 animate-spin" />}
                                {t('updateButton')}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Notifications Section */}
                <section>
                    <h2 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">
                        {t('notifications')}
                    </h2>
                    <div className="bg-[#1a1d2d] rounded-2xl border border-white/5 p-4 flex items-center justify-between">
                        <span className="text-sm text-gray-300">Notificaciones por correo</span>
                        <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer opacity-50">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="mt-12 pb-12">
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
                                    autoComplete="off"
                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-500/50 transition-colors uppercase tracking-widest placeholder:normal-case font-mono text-white"
                                />
                            </div>

                            <button
                                type="button"
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
                                    <div className="w-6 h-6 border-2 border-gray-600 rounded-full peer-checked:bg-red-500 peer-checked:border-red-500 transition-all flex items-center justify-center">
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
                                            ? "bg-red-600 hover:bg-red-500 text-white shadow-red-500/20"
                                            : "bg-[#0f111a] text-gray-600 cursor-not-allowed"
                                    )}
                                >
                                    {isDeleting ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-white" /> : t('modal.confirmButton')}
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
