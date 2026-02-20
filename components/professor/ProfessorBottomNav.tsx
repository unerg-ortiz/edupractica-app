"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    LayoutGrid,
    BookOpen,
    Users,
    Settings
} from 'lucide-react';
import clsx from 'clsx';

export default function ProfessorBottomNav() {
    const pathname = usePathname();
    const { lang } = useParams();
    const t = useTranslations('Professor.nav');

    const navItems = [
        { id: 'reports', name: t('reports'), icon: LayoutGrid, href: `/${lang}/admin/analytics` },
        { id: 'students', name: t('students'), icon: Users, href: `/${lang}/admin/users` },
        { id: 'course', name: 'Revisión', icon: BookOpen, href: `/${lang}/admin/content-review` },
        { id: 'settings', name: t('settings'), icon: Settings, href: `/${lang}/professor` },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#080C14]/90 border-t border-white/5 pb-safe pt-2 px-6 z-40 backdrop-blur-2xl shadow-[0_-20px_40px_rgba(0,0,0,0.4)]">
            <div className="flex justify-between items-center max-w-md mx-auto h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center gap-1.5 transition-all duration-500 relative",
                                isActive ? "text-blue-500 scale-110" : "text-slate-500 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <div className="absolute -top-3 w-10 h-1 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-in zoom-in duration-300" />
                            )}
                            <item.icon size={24} strokeWidth={isActive ? 3 : 2} className="transition-all" />
                            <span className={clsx(
                                "text-[10px] uppercase tracking-[0.15em] transition-all",
                                isActive ? "font-black" : "font-bold opacity-60"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
