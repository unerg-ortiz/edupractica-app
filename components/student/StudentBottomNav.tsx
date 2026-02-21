"use client";

import React from 'react';
import Link from 'next/link';
import { Home, Map, Trophy, User } from 'lucide-react';
import { usePathname, useParams } from 'next/navigation';

export default function StudentBottomNav() {
    const pathname = usePathname();
    const { lang } = useParams();

    const navItems = [
        { name: 'Panel', icon: Home, href: `/${lang}/student/dashboard` },
        { name: 'Logros', icon: Trophy, href: `/${lang}/student/achievements` },
        { name: 'Perfil', icon: User, href: `/${lang}/profile` },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0B1120] border-t border-slate-800 pb-safe pt-2 px-6 z-40">
            <div className="flex justify-between items-center max-w-md mx-auto h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 transition-colors ${
                                isActive ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
