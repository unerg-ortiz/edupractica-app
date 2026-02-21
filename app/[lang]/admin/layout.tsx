import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#080C14]">
            <AdminHeader />
            <main className="min-h-[calc(100vh-4rem)]">
                {children}
            </main>
        </div>
    );
}
