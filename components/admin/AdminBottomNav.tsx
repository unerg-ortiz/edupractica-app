import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LayoutGrid, Shapes, Users, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const AdminBottomNav = () => {
    const pathname = usePathname();
    const t = useTranslations('Admin.nav');

    const navItems = [
        { name: t('dashboard'), icon: LayoutGrid, href: '/admin/dashboard' },
        { name: t('categories'), icon: Shapes, href: '/admin/categories' },
        { name: t('users'), icon: Users, href: '/admin/users' },
        { name: t('settings'), icon: Settings, href: '/admin/settings' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0B1120] border-t border-slate-800 pb-safe pt-2 px-6 z-40">
            <div className="flex justify-between items-center max-w-md mx-auto h-16">
                {navItems.map((item) => {
                    const isActive = pathname?.includes(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-blue-500' : 'text-slate-500 hover:text-slate-300'
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
};
