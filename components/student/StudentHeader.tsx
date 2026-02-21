"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { Home, Trophy, User, LogOut, Menu, X } from 'lucide-react';
import clsx from 'clsx';

import { useTranslations } from 'next-intl';

export default function StudentHeader() {
    const t = useTranslations('Professor.nav'); // Reusing nav translations or could use specific student ones
    const pathname = usePathname();
    const { lang } = useParams();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Panel', icon: Home, href: `/${lang}/student/dashboard` },
        { name: 'Logros', icon: Trophy, href: `/${lang}/student/achievements` },
        { name: 'Perfil', icon: User, href: `/${lang}/profile` },
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
        setUserEmail(localStorage.getItem('user_email'));
        setUserName(localStorage.getItem('user_name'));
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-[#080C14]/95 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href={`/${lang}/student/dashboard`} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
                            <span className="text-white font-black text-xl">E</span>
                        </div>
                        <span className="text-white font-black text-2xl tracking-tight hidden sm:block">EduPráctica</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={clsx(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-semibold",
                                        isActive
                                            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-3 px-3 py-2 bg-[#0F172A]/50 rounded-xl border border-white/5">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-2 border-cyan-400/50">
                                    <span className="text-white font-black text-sm">
                                        {userName ? userName.charAt(0).toUpperCase() : 'E'}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#080C14] rounded-full" />
                            </div>
                            <div className="hidden lg:block min-w-0">
                                <p className="text-white font-bold text-sm truncate">
                                    {userName || 'Estudiante'}
                                </p>
                            </div>
                        </div>
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
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold",
                                        isActive
                                            ? "bg-cyan-500 text-white"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="px-4 py-3 border-t border-white/5">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A]/50 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-2 border-cyan-400/50">
                                        <span className="text-white font-black text-sm">
                                            {userName ? userName.charAt(0).toUpperCase() : 'E'}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0B1120] rounded-full" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">
                                        {userName || 'Estudiante'}
                                    </p>
                                    <p className="text-slate-500 text-xs truncate">
                                        {userEmail || 'estudiante@edu.com'}
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
