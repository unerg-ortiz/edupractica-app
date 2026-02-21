"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    Home,
    BookOpen,
    ArrowRightLeft,
    BarChart2,
    Users,
    Settings,
    LogOut
} from 'lucide-react';
import clsx from 'clsx';

export default function ProfessorSidebar() {
    const t = useTranslations('Professor.nav');
    const pathname = usePathname();
    const { lang } = useParams();

    const menuItems = [
        { id: 'home', icon: Home, label: t('home'), href: `/${lang}/professor` },
        { id: 'topics', icon: BookOpen, label: 'Mi Contenido', href: `/${lang}/professor` },
        { id: 'transfer', icon: ArrowRightLeft, label: t('transfer'), href: `/${lang}/professor/content-transfer/initiate` },
        { id: 'reports', icon: BarChart2, label: t('reports'), href: `/${lang}/professor/analytics` },
        { id: 'students', icon: Users, label: t('students'), href: `/${lang}/professor/students` },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-[#080C14] border-r border-white/5 h-screen sticky top-0">
            {/* Logo */}
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <span className="text-white font-black text-xl">E</span>
                    </div>
                    <span className="text-white font-black text-2xl tracking-tight">EduPráctica</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30"
                                    : "text-slate-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={clsx(
                                "w-6 h-6 transition-all duration-300",
                                isActive ? "text-white scale-110" : "text-slate-500 group-hover:text-white"
                            )} />
                            <span className={clsx("text-lg transition-all", isActive ? "font-black" : "font-bold")}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 space-y-2">
                <Link
                    href={`/${lang}/profile`}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-500 hover:text-white hover:bg-white/5 transition-all group"
                >
                    <Settings className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                    <span className="font-bold text-lg">{t('settings')}</span>
                </Link>

                <div className="mt-4 p-5 bg-[#0F172A]/80 backdrop-blur-xl rounded-[32px] border border-white/5 flex items-center gap-4 shadow-2xl">
                    <div className="relative group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                            className="w-12 h-12 rounded-full object-cover border-2 border-green-500/50 transition-transform group-hover:scale-110"
                            alt="Prof"
                        />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0F172A] rounded-full animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-black text-sm truncate leading-none mb-1">Prof. Elena</p>
                        <p className="text-slate-500 font-bold text-[10px] truncate uppercase tracking-widest opacity-60">elena@edu.com</p>
                    </div>
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
