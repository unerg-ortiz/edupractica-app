"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Simple types since we might not have a shared lib yet
type Role = 'student' | 'professor' | 'admin';

export default function RegisterForm({ locale }: { locale: string }) {
    const t = useTranslations('Register');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            role: 'student' as Role,
            email: '',
            password: ''
        }
    });

    const currentRole = watch('role');

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        console.log('Form data:', data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        // Check functionality only, actual API implementation is out of scope as per instructions
    };

    const roles: Role[] = ['student', 'professor', 'admin'];

    return (
        <div className="w-full max-w-md p-8 bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Role Selector */}
                <div className="bg-[#0f172a] p-1 rounded-xl flex relative">
                    {roles.map((role) => (
                        <button
                            key={role}
                            type="button"
                            onClick={() => setValue('role', role)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${currentRole === role
                                ? 'bg-[#1e293b] text-white shadow-lg'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {role === 'student' && t('roles.student')}
                            {role === 'professor' && t('roles.professor')}
                            {role === 'admin' && t('roles.admin')}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                            {t('emailLabel')}
                        </label>
                        <input
                            {...register('email', {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                            className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder={t('emailPlaceholder')}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.email.type === 'required' ? 'Email is required' : 'Invalid email address'}
                            </span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                            {t('passwordLabel')}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register('password', { required: true, minLength: 6 })}
                                className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.password.type === 'required' ? 'Password is required' : 'Password must be at least 6 characters'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {t('submitButton', { role: t(`roles.${currentRole}`) })}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                    {t('alreadyHaveAccount')}{' '}
                    <Link href={`/${locale}/login`} className="text-blue-500 hover:text-blue-400 font-medium hover:underline transition-all">
                        {t('loginLink')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
