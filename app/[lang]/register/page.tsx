import { useTranslations } from 'next-intl';
import RegisterForm from '@/components/auth/RegisterForm';
import { ArrowLeft, Sun } from 'lucide-react';
import Link from 'next/link';

export default async function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = await import('next-intl/server').then(mod => mod.getTranslations({ locale: lang, namespace: 'Register' }));

    return (
        <div className="min-h-screen bg-[#0B1120] text-white flex flex-col relative overflow-hidden font-sans">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-10 w-full max-w-7xl mx-auto">
                <Link href={`/${lang}/login`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-sm">{t('back')}</span>
                </Link>

                <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
                    <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase select-none">
                        {t('header')}
                    </span>
                </div>

                {/* Placeholder for balance layout */}
                <div className="w-20 hidden sm:block"></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 w-full max-w-7xl mx-auto">
                <div className="text-center mb-10 space-y-3 animate-in slide-in-from-bottom-5 fade-in duration-700">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
                        {t('title')}
                    </h1>
                    <p className="text-slate-400 text-lg font-medium">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="w-full flex justify-center animate-in slide-in-from-bottom-10 fade-in duration-700 delay-150">
                    <RegisterForm locale={lang} />
                </div>
            </main>

            {/* Theme Toggle - Fixed Bottom Right */}
            <div className="fixed bottom-6 right-6 z-20">
                <button
                    type="button"
                    className="p-3 bg-[#1e293b]/80 backdrop-blur-md rounded-full text-slate-400 hover:text-yellow-400 hover:bg-[#2d3b4e] transition-all shadow-lg border border-slate-700/50"
                    aria-label="Toggle theme"
                >
                    <Sun className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
