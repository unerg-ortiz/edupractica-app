"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Loader2, ArrowRight, X } from "lucide-react";
import { auth } from "@/lib/api";

type Role = "student" | "professor" | "admin";

export default function RegisterPage() {
    const t = useTranslations("Register");
    const router = useRouter();
    const { lang } = useParams();

    const [role, setRole] = useState<Role>("student");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError(t("passwordsDontMatch"));
            return;
        }

        setIsLoading(true);

        try {
            await auth.signup({
                email,
                password,
                role,
                full_name: `${firstName} ${lastName}`.trim(),
            });

            setShowSuccessToast(true);

            // Redirect after 2 seconds to let the user see the success message
            setTimeout(() => {
                router.push(`/${lang}/login?registered=true`);
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Error al crear la cuenta");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0B1120] text-slate-200 flex flex-col relative px-6 py-8">
            {/* Navigation Header */}
            <div className="flex items-center justify-between max-w-7xl mx-auto w-full mb-4">
                <Link
                    href={`/${lang}/login`}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                    <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
                    <span className="font-medium">{t("back")}</span>
                </Link>

                <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">
                    {t("header")}
                </span>

                <div className="w-20"></div> {/* Spacer for symmetry */}
            </div>

            {/* Logo with BETA badge */}
            <div className="flex justify-center items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <span className="text-white font-black text-xl">E</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-white font-black text-2xl tracking-tight">EduPráctica</span>
                    <span className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-md shadow-lg shadow-orange-500/30">BETA</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full pb-12">
                {/* Hero Header */}
                <div className="text-center mb-6 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{t("title")}</h1>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed px-4 md:px-0">{t("description")}</p>
                </div>

                {/* Form Card */}
                <div className="bg-[#131B2E]/50 border border-slate-800/50 rounded-[24px] md:rounded-[32px] p-5 md:p-8 backdrop-blur-sm shadow-2xl">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    {/* Role Selector */}
                    <div className="bg-[#0B1120] p-1.5 rounded-2xl flex gap-1 mb-8">
                        {(["student", "professor"] as const).map((r) => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                disabled={isLoading}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${role === r
                                    ? "bg-[#1E293B] text-white shadow-lg"
                                    : "text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                {t(r)}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300 ml-1">
                                    {t("firstNameLabel")}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t("firstNamePlaceholder")}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    autoComplete="off"
                                    className="w-full bg-[#0B1120] border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300 ml-1">
                                    {t("lastNameLabel")}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t("lastNamePlaceholder")}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    autoComplete="off"
                                    className="w-full bg-[#0B1120] border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300 ml-1">
                                {t("emailLabel")}
                            </label>
                            <input
                                type="email"
                                placeholder={t("emailPlaceholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                autoComplete="off"
                                className="w-full bg-[#0B1120] border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300 ml-1">
                                    {t("passwordLabel")}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                        className="w-full bg-[#0B1120] border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300 ml-1">
                                    {t("confirmPasswordLabel")}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                        className={`w-full bg-[#0B1120] border rounded-2xl px-5 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${confirmPassword && password !== confirmPassword
                                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                                            : "border-slate-700/50 focus:border-blue-500 focus:ring-blue-500"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl py-4 mt-4 transition-all duration-300 shadow-xl shadow-blue-900/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>{t("submitButton", { role: t(role) })}</span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-10">
                    <p className="text-slate-400 font-medium">
                        {t("alreadyHaveAccount")}{" "}
                        <Link
                            href={`/${lang}/login`}
                            className="text-blue-500 hover:text-blue-400 font-bold transition-colors"
                        >
                            {t("login")}
                        </Link>
                    </p>
                </div>

                {/* Contrast Toggle */}
                <div className="fixed bottom-6 right-6">
                    <button className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-lg border border-slate-700/50">
                        <div className="w-6 h-6 rounded-full border-2 border-current flex overflow-hidden">
                            <div className="w-1/2 h-full bg-current"></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Success Notification */}
            {showSuccessToast && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in duration-300 w-full max-w-sm px-6">
                    <div className="bg-[#131B2E]/90 border border-emerald-500/50 rounded-[32px] p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.2)] text-center relative">
                        <button
                            onClick={() => setShowSuccessToast(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">¡Registro completado!</h3>
                        <p className="text-slate-400">Tu cuenta ha sido creada exitosamente. Redirigiendo al inicio de sesión...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
