"use client";

import React, { useEffect, useState } from 'react';
import StudentHeader from '@/components/student/StudentHeader';
import ProfessorHeader from '@/components/professor/ProfessorHeader';
import AdminHeader from '@/components/admin/AdminHeader';

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('user_role');
            setUserRole(role);
        }
    }, []);

    const renderHeader = () => {
        switch (userRole) {
            case 'student':
                return <StudentHeader />;
            case 'professor':
                return <ProfessorHeader />;
            case 'admin':
                return <AdminHeader />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#050511]">
            {renderHeader()}
            <main className="min-h-[calc(100vh-4rem)]">
                {children}
            </main>
        </div>
    );
}
