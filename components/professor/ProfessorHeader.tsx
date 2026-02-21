"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Home, BookOpen, ArrowRightLeft, BarChart2, Users, User, LogOut, Menu, X } from 'lucide-react';
import clsx from 'clsx';

export default function ProfessorHeader() {
    const t = useTranslations('Professor.nav');
    const pathname = usePathname();
    const { lang } = useParams();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', icon: Home, label: t('home'), href: `/${lang}/professor` },
        { id: 'topics', icon: BookOpen, label: 'Contenido', href: `/${lang}/professor` },
        { id: 'transfer', icon: ArrowRightLeft, label: t('transfer'), href: `/${lang}/professor/content-transfer/initiate` },
        { id: 'reports', icon: BarChart2, label: t('reports'), href: `/${lang}/professor/analytics` },
        { id: 'students', icon: Users, label: t('students'), href: `/${lang}/professor/students` },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name');
        router.push(`/${lang}/login`);
    };

    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    React.useEffect(() => {
        const storedName = localStorage.getItem('user_name');
        const storedEmail = localStorage.getItem('user_email');

        if (storedName) setUserName(storedName);
        if (storedEmail) setUserEmail(storedEmail);

        // Fetch to ensure it's up to date
        import('@/lib/api').then(({ users }) => {
            users.getMe().then(user => {
                setUserName(user.full_name);
                setUserEmail(user.email);
                localStorage.setItem('user_name', user.full_name);
                localStorage.setItem('user_email', user.email);
            }).catch(console.error);
        });
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-[#080C14]/95 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href={`/${lang}/professor`} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-105">
                            <span className="text-white font-black text-xl">E</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-black text-2xl tracking-tight hidden sm:block">EduPráctica</span>
                            <span className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-md shadow-lg shadow-orange-500/30 hidden sm:block">BETA</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href={`/${lang}/profile`}
                            className="flex items-center gap-3 px-3 py-2 bg-[#0F172A]/50 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all"
                        >
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-blue-500/50">
                                    <span className="text-white font-black text-sm">
                                        {userName ? userName.charAt(0).toUpperCase() : 'P'}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#080C14] rounded-full" />
                            </div>
                            <div className="hidden lg:block min-w-0">
                                <p className="text-white font-bold text-sm truncate">
                                    {userName || 'Profesor'}
                                </p>
                            </div>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Cerrar sesión"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-white/5 bg-[#0B1120]/98 backdrop-blur-lg">
                    <nav className="px-4 py-3 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold",
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="px-4 py-3 border-t border-white/5">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A]/50 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-blue-500/50">
                                        <span className="text-white font-black text-sm">
                                            {userName ? userName.charAt(0).toUpperCase() : 'P'}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0B1120] rounded-full" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">
                                        {userName || 'Profesor'}
                                    </p>
                                    <p className="text-slate-500 text-xs truncate">
                                        {userEmail || 'profesor@edu.com'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                title="Cerrar sesión"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
