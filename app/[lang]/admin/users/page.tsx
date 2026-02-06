"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, MoreVertical, LayoutGrid, Users, BookOpen, Settings } from 'lucide-react';
import clsx from 'clsx';
import BlockUserModal from '@/components/admin/BlockUserModal';

interface User {
    id: string;
    name: string;
    email: string;
    initials: string;
    status: 'active' | 'blocked';
    imageUrl?: string; // Optional real image
}

export default function UsersPage() {
    const t = useTranslations('Users');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<User[]>([
        { id: '1024', name: 'Juan Pérez', email: 'juan.perez@email.com', initials: 'JP', status: 'active' },
        { id: '1025', name: 'María Garcia', email: 'm.garcia@provider.com', initials: 'MG', status: 'active', imageUrl: '/path-to-avatar.jpg' },
        { id: '1026', name: 'Carlos Ruiz', email: 'cruiz_admin@comp.com', initials: 'CR', status: 'blocked' },
        { id: '1027', name: 'Ricardo Sosa', email: 'rsosa.dev@webmail.com', initials: 'RS', status: 'active' },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const handleBlockClick = (userId: string) => {
        setSelectedUserId(userId);
        setModalOpen(true);
    };

    const handleUnblockClick = (userId: string) => {
        // Implement unblock logic here directly or via another modal
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u));
    };

    const handleBlockConfirm = (reason: string) => {
        if (selectedUserId) {
            setUsers(users.map(u => u.id === selectedUserId ? { ...u, status: 'blocked' } : u));
            setModalOpen(false);
            setSelectedUserId(null);
            console.log(`User ${selectedUserId} blocked for reason: ${reason}`);
            // Add audit log logic here
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#050511] text-white font-sans pb-24">
            {/* Header */}
            <header className="px-6 py-5 flex items-center justify-between bg-[#050511] sticky top-0 z-10 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <span className="text-blue-500 font-bold text-lg">group</span>
                    <h1 className="text-xl font-bold">{t('title')}</h1>
                </div>
                <MoreVertical className="w-6 h-6 text-gray-400" />
            </header>

            <main className="px-6 pt-4">
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
                                    {/* Mocking actual image logic with initials for now as standard */}
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
                                    // Image shows "Desbloquear" is also blue button
                                )}
                            >
                                {user.status === 'active' ? t('block') : t('unblock')}
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Block Modal */}
            <BlockUserModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleBlockConfirm}
            />

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 w-full bg-[#050511] border-t border-white/5 px-6 py-4 flex justify-between items-center z-50">
                <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition group cursor-pointer">
                    <LayoutGrid className="w-6 h-6 group-hover:text-white transition" />
                    <span className="text-[10px] font-medium">{useTranslations('Admin.nav')('dashboard')}</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-blue-500 cursor-pointer">
                    <Users className="w-6 h-6" />
                    <span className="text-[10px] font-medium">{useTranslations('Admin.nav')('users')}</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition group cursor-pointer">
                    <BookOpen className="w-6 h-6 group-hover:text-white transition" />
                    <span className="text-[10px] font-medium">Analytics</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition group cursor-pointer">
                    <Settings className="w-6 h-6 group-hover:text-white transition" />
                    <span className="text-[10px] font-medium">{useTranslations('Admin.nav')('settings')}</span>
                </div>
            </nav>
        </div>
    );
}
