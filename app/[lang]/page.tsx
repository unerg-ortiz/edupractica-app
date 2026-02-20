'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    GraduationCap,
    LayoutGrid,
    FlaskConical,
    Laptop,
    MoreVertical,
    ArrowRight
} from 'lucide-react';

export default function Home() {
    const t = useTranslations('Landing');
    const { lang } = useParams();

    return (
        <div className="min-h-screen bg-[#050911] text-white selection:bg-blue-500/30 font-sans">
            {/* Navigation */}
            <header className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">EduPráctica</span>
                </div>
                <Link
                    href={`/${lang}/login`}
                    className="text-zinc-400 hover:text-white transition-colors font-medium text-sm md:text-base"
                >
                    {t('login')}
                </Link>
            </header>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center pt-16 md:pt-24 pb-12 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                    {t('title')}<br />
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                        {t('titleAccent')}
                    </span>
                </h1>

                <p className="text-zinc-400 text-base md:text-xl max-w-2xl mb-12 leading-relaxed">
                    {t('description')}
                </p>

                <div className="flex flex-row items-center justify-center gap-4 mb-24 w-full md:w-auto">
                    <Link
                        href={`/${lang}/login`}
                        className="group flex-1 md:flex-none flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 transition-all px-8 py-4 rounded-3xl font-bold text-lg shadow-[0_0_40px_rgba(37,99,235,0.25)] hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transform hover:-translate-y-1"
                    >
                        <LayoutGrid className="w-5 h-5 md:w-6 md:h-6" />
                        {t('ctaPanel')}
                    </Link>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                    {/* Students Card */}
                    <Link href={`/${lang}/login`} className="bg-[#0D1525] border border-zinc-800/50 p-6 md:p-8 rounded-[32px] text-left hover:border-zinc-700 transition-all group relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-6">
                            <MoreVertical className="text-zinc-600 w-5 h-5" />
                        </div>

                        <div className="bg-green-500/10 w-12 h-12 flex items-center justify-center rounded-xl mb-6 group-hover:bg-green-500/20 transition-colors">
                            <FlaskConical className="text-green-500 w-6 h-6" />
                        </div>

                        <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{t('students.title')}</h3>
                        <div className="mb-4">
                            <span className="text-xs font-semibold text-green-500/90 uppercase tracking-wider bg-green-500/10 px-2.5 py-1 rounded-md">
                                {t('students.subtitle')}
                            </span>
                        </div>

                        <p className="text-zinc-400 mb-8 leading-relaxed text-sm md:text-base">
                            {t('students.description')}
                        </p>

                        <div className="mt-auto pt-6 border-t border-zinc-900 flex items-center gap-2 text-zinc-300 font-bold group-hover:text-white transition-colors">
                            {t('students.link')}
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Professors Card */}
                    <Link href={`/${lang}/login`} className="bg-[#0D1525] border border-zinc-800/50 p-6 md:p-8 rounded-[32px] text-left hover:border-zinc-700 transition-all group relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-6">
                            <MoreVertical className="text-zinc-600 w-5 h-5" />
                        </div>

                        <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-xl mb-6 group-hover:bg-blue-500/20 transition-colors">
                            <Laptop className="text-blue-500 w-6 h-6" />
                        </div>

                        <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{t('professors.title')}</h3>
                        <div className="mb-4">
                            <span className="text-xs font-semibold text-blue-500/90 uppercase tracking-wider bg-blue-500/10 px-2.5 py-1 rounded-md">
                                {t('professors.subtitle')}
                            </span>
                        </div>

                        <p className="text-zinc-400 mb-8 leading-relaxed text-sm md:text-base">
                            {t('professors.description')}
                        </p>

                        <div className="mt-auto pt-6 border-t border-zinc-900 flex items-center gap-2 text-zinc-300 font-bold group-hover:text-white transition-colors">
                            {t('professors.link')}
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-24 px-6 py-12 max-w-7xl mx-auto border-t border-zinc-800/30 flex flex-col md:flex-row items-center justify-between gap-8">
                <p className="text-zinc-600 text-sm font-medium">
                    {t('footer.copyright')}
                </p>
                <div className="flex items-center gap-8 text-sm text-zinc-500 font-medium">
                    <Link href="#" className="hover:text-zinc-300 transition-colors">{t('footer.privacy')}</Link>
                    <Link href="#" className="hover:text-zinc-300 transition-colors">{t('footer.terms')}</Link>
                    <Link href="#" className="hover:text-zinc-300 transition-colors">{t('footer.support')}</Link>
                </div>
            </footer>
        </div>
    );
}
