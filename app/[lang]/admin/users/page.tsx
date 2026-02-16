"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, MoreVertical, LayoutGrid, Users, BookOpen, Settings, ChevronLeft, ChevronRight, User as UserIcon, Filter, AppWindow, BarChart } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import BlockUserModal from '@/components/admin/BlockUserModal';

interface User {
    id: string;
    name: string;
    email: string;
    initials: string;
    status: 'active' | 'blocked';
    imageUrl?: string;
}

// Sidebar Nav Item Component (Local to avoid conflicts)
function NavItem({ icon: Icon, label, active = false, href }: { icon: any, label: string, active?: boolean, href: string }) {
    return (
        <Link
            href={href}
            className={clsx(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium text-sm group",
                active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            )}
        >
            <Icon className={clsx(
                "w-5 h-5 transition-colors",
                active ? "text-white" : "text-slate-500 group-hover:text-slate-300"
            )} />
            <span>{label}</span>
        </Link>
    );
}

export default function UsersPage({ params }: { params?: { lang: string } }) {
    const t = useTranslations('Users');
    const tAdmin = useTranslations('Admin.nav');
    const lang = params?.lang || 'es'; // Fallback if params issue

    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([
        { id: '1024', name: 'Juan Pérez', email: 'juan.perez@email.com', initials: 'JP', status: 'active' },
        { id: '1025', name: 'María Garcia', email: 'm.garcia@provider.com', initials: 'MG', status: 'active', imageUrl: '/path-to-avatar.jpg' },
        { id: '1026', name: 'Carlos Ruiz', email: 'cruiz_admin@comp.com', initials: 'CR', status: 'blocked' },
        { id: '1027', name: 'Ricardo Sosa', email: 'rsosa.dev@webmail.com', initials: 'RS', status: 'active' },
        { id: '1028', name: 'Elena Torres', email: 'elena.t@edu.org', initials: 'ET', status: 'active' },
        { id: '1029', name: 'Miguel Ángel', email: 'mangel@studio.com', initials: 'MA', status: 'blocked' },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    // Filter Logic
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBlockClick = (userId: string) => {
        setSelectedUserId(userId);
        setModalOpen(true);
    };

    const handleUnblockClick = (userId: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u));
    };

    const handleBlockConfirm = (reason: string) => {
        if (selectedUserId) {
            setUsers(users.map(u => u.id === selectedUserId ? { ...u, status: 'blocked' } : u));
            setModalOpen(false);
            setSelectedUserId(null);
            console.log(`User ${selectedUserId} blocked for reason: ${reason}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-sans">

            {/* ================= DESKTOP LAYOUT (NEW) ================= */}
            <div className="hidden md:flex min-h-screen">
                {/* Sidebar - Consistent with Categories Page */}
                <aside className="w-64 bg-[#0B1120] border-r border-white/5 flex flex-col sticky top-0 h-screen z-20">
                    <div className="p-6">
                        <Link href={`/${lang}/admin`} className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
                            <LayoutGrid className="w-8 h-8 text-blue-500 fill-blue-500/20" />
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                EduAdmin
                            </span>
                        </Link>

                        <nav className="space-y-2">
                            <NavItem href={`/${lang}/admin`} icon={LayoutGrid} label="Panel" />
                            <NavItem href={`/${lang}/admin/categories`} icon={AppWindow} label="Categorías" />
                            <NavItem href={`/${lang}/admin/users`} icon={Users} label="Usuarios" active />
                            <NavItem href={`/${lang}/admin/reports`} icon={BarChart} label="Reportes" />
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-white/5">
                        <nav className="space-y-2 mb-6">
                            <NavItem href={`/${lang}/admin/settings`} icon={Settings} label="Ajustes" />
                        </nav>

                        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-white/10">
                                <Users className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">Admin User</span>
                                <span className="text-xs text-slate-500">admin@example.com</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-8 overflow-y-auto scrollbar-hide h-screen bg-[#050511] relative">
                    {/* Background Ambient */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/5 blur-[120px] pointer-events-none rounded-full" />

                    {/* Top Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight mb-1">{t('title')}</h1>
                            <p className="text-slate-400">
                                {t('subtitle')}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder={t('searchPlaceholder')}
                                    className="bg-[#131b2e] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="bg-[#131b2e] border border-white/10 p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10">
                        <div className="bg-[#111927] p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('stats.total')}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">1,284</span>
                                <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">~+12%</span>
                            </div>
                        </div>
                        <div className="bg-[#111927] p-6 rounded-3xl border border-white/5">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('stats.active')}</p>
                            <span className="text-3xl font-bold text-emerald-400">1,120</span>
                        </div>
                        <div className="bg-[#111927] p-6 rounded-3xl border border-white/5">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('stats.blocked')}</p>
                            <span className="text-3xl font-bold text-red-400">164</span>
                        </div>
                        <div className="bg-[#111927] p-6 rounded-3xl border border-white/5">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('stats.new')}</p>
                            <span className="text-3xl font-bold text-white">42</span>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-[#111927] rounded-3xl border border-white/5 overflow-hidden relative z-10 shadow-xl shadow-black/20">
                        {/* Table Header */}
                        <div className="grid grid-cols-[2fr,1fr,2fr,1fr,1fr] gap-4 p-5 border-b border-white/5 bg-[#161e31] text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <div>{t('columns.user')}</div>
                            <div>{t('columns.id')}</div>
                            <div>{t('columns.email')}</div>
                            <div>{t('columns.status')}</div>
                            <div className="text-right">{t('columns.actions')}</div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-white/5">
                            {filteredUsers.map(user => (
                                <div key={user.id} className="grid grid-cols-[2fr,1fr,2fr,1fr,1fr] gap-4 p-5 items-center hover:bg-white/[0.02] transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-300 font-bold text-sm shrink-0 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                                            {user.initials}
                                        </div>
                                        <span className="font-bold text-white text-sm">{user.name}</span>
                                    </div>
                                    <div className="text-slate-500 text-sm font-medium">#{user.id}</div>
                                    <div className="text-slate-400 text-sm truncate">{user.email}</div>
                                    <div>
                                        <span className={clsx(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
                                            user.status === 'active'
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-red-500/10 text-red-400 border-red-500/20"
                                        )}>
                                            <div className={clsx("w-1.5 h-1.5 rounded-full", user.status === 'active' ? "bg-emerald-400" : "bg-red-400")} />
                                            {t(user.status)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <button
                                            onClick={() => user.status === 'active' ? handleBlockClick(user.id) : handleUnblockClick(user.id)}
                                            className={clsx(
                                                "px-4 py-2 rounded-lg font-bold text-xs transition-all",
                                                user.status === 'active'
                                                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                                                    : "bg-[#1e293b] hover:bg-[#253248] text-blue-400 border border-blue-500/20" // Unblock style variant
                                            )}
                                        >
                                            {user.status === 'active' ? t('block') : t('unblock')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="p-5 border-t border-white/5 flex items-center justify-between bg-[#131b2e]">
                            <p className="text-slate-400 text-xs">
                                {t('pagination', { start: 1, end: filteredUsers.length, total: 1284 })}
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-600/20">
                                    1
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 text-xs font-medium transition-colors">
                                    2
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 text-xs font-medium transition-colors">
                                    3
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>


            {/* ================= MOBILE LAYOUT (EXISTING - PRESERVED) ================= */}
            <div className="md:hidden">
                {/* Header */}
                <header className="px-6 py-5 flex items-center justify-between bg-[#050511] sticky top-0 z-10 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <span className="text-blue-500 font-bold text-lg">group</span>
                        <h1 className="text-xl font-bold">{t('title')}</h1>
                    </div>
                    <MoreVertical className="w-6 h-6 text-gray-400" />
                </header>

                <main className="px-6 pt-4 pb-24">
                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#151b2d] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                        />
                    </div>

                    {/* User List */}
                    <div className="space-y-4">
                        {filteredUsers.map(user => (
                            <div key={user.id} className="bg-[#151b2d] rounded-2xl p-4 flex items-center justify-between border border-white/5">
                                <div className="flex items-center gap-4 min-w-0">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center text-gray-900 font-bold text-sm shrink-0">
                                        {user.initials}
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="font-bold text-white text-base truncate">{user.name}</h3>
                                            <span className="text-gray-500 text-xs">#{user.id}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm truncate">{user.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className={`text-xs font-medium ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                                {t(user.status)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => user.status === 'active' ? handleBlockClick(user.id) : handleUnblockClick(user.id)}
                                    className={clsx(
                                        "px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg shrink-0",
                                        user.status === 'active'
                                            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
                                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
                                    )}
                                >
                                    {user.status === 'active' ? t('block') : t('unblock')}
                                </button>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Bottom Nav (Mobile Only) */}
                <nav className="fixed bottom-0 w-full bg-[#050511] border-t border-white/5 px-6 py-4 flex justify-between items-center z-50">
                    <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition group cursor-pointer">
                        <LayoutGrid className="w-6 h-6 group-hover:text-white transition" />
                        <span className="text-[10px] font-medium">{tAdmin('dashboard')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-blue-500 cursor-pointer">
                        <Users className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{tAdmin('users')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition group cursor-pointer">
                        <BookOpen className="w-6 h-6 group-hover:text-white transition" />
                        <span className="text-[10px] font-medium">Analytics</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition group cursor-pointer">
                        <Settings className="w-6 h-6 group-hover:text-white transition" />
                        <span className="text-[10px] font-medium">{tAdmin('settings')}</span>
                    </div>
                </nav>
            </div>

            {/* Block Modal (Shared) */}
            <BlockUserModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleBlockConfirm}
            />
        </div>
    );
}
