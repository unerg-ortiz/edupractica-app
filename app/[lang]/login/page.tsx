"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { auth } from "@/lib/api";
import { useRouter, useSearchParams, useParams } from "next/navigation";

export default function LoginPage() {
    const t = useTranslations("Auth");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const lang = params.lang as string;

    const registered = searchParams.get('registered');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('username', data.email);
            formData.append('password', data.password);

            const result = await auth.login(formData);

            // Save to localStorage
            localStorage.setItem('token', result.access_token);
            localStorage.setItem('user', JSON.stringify({
                email: result.user_email,
                role: result.user_role,
                name: result.user_name
            }));

            // Redirect based on role
            if (result.user_role === 'admin') {
                router.push(`/${lang}/admin`);
            } else if (result.user_role === 'professor') {
                router.push(`/${lang}/professor`);
            } else {
                router.push(`/${lang}/learning-path`);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0B1120] text-slate-200 flex flex-col relative px-6 py-8">
            {/* Back Button */}
            <div className="absolute top-8 left-6">
                <Link href="/" className="hover:text-white transition-colors">
                    <ChevronLeft className="w-8 h-8 text-white" strokeWidth={2.5} />
                </Link>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">{t("welcome")}</h1>
                    <p className="text-slate-400 text-lg">{t("subText")}</p>
                </div>

                {registered && (
                    <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-2xl text-sm text-center">
                        ¡Registro exitoso! Por favor, inicia sesión.
                    </div>
                )}

                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-2xl text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300 ml-1">
                            {t("emailLabel")}
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                placeholder={t("emailPlaceholder")}
                                className="w-full bg-[#131B2E] border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                            />
                        </div>
                        {errors.email && <span className="text-red-500 text-xs ml-1">El correo es requerido</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300 ml-1">
                            {t("passwordLabel")}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', { required: true })}
                                placeholder="••••••••"
                                className="w-full bg-[#131B2E] border border-slate-700/50 rounded-2xl px-5 py-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs ml-1">La contraseña es requerida</span>}
                    </div>

                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors"
                        >
                            {t("forgotPassword")}
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl py-4 transition-all duration-200 shadow-lg shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t("loginButton")}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest font-medium">
                        <span className="bg-[#0B1120] px-4 text-slate-500">
                            {t("orContinueWith")}
                        </span>
                    </div>
                </div>

                {/* Social Login */}
                <div className="flex justify-center gap-6 mb-12">
                    {/* Google Button */}
                    <button className="w-14 h-14 rounded-full bg-[#131B2E] border border-slate-700/50 flex items-center justify-center hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 group">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                    </button>

                    {/* Microsoft Button */}
                    <button className="w-14 h-14 rounded-full bg-[#131B2E] border border-slate-700/50 flex items-center justify-center hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 group">
                        <svg className="w-6 h-6" viewBox="0 0 23 23">
                            <path fill="#f3f3f3" d="M0 0h23v23H0z" fillOpacity="0" />
                            <path fill="#f35325" d="M1 1h10v10H1z" />
                            <path fill="#81bc06" d="M12 1h10v10H1z" />
                            <path fill="#05a6f0" d="M1 12h10v10H1z" />
                            <path fill="#ffba08" d="M12 12h10v10H1z" />
                        </svg>
                    </button>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-slate-400">
                        {t("noAccount")}{" "}
                        <Link
                            href="/register"
                            className="text-blue-500 hover:text-blue-400 font-semibold transition-colors"
                        >
                            {t("register")}
                        </Link>
                    </p>
                </div>

                {/* Contrast Toggle Mockup */}
                <div className="fixed bottom-6 right-6">
                    <button className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                        <div className="w-6 h-6 rounded-full border-2 border-current flex overflow-hidden">
                            <div className="w-1/2 h-full bg-current"></div>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
}
