import React from 'react';
import StudentHeader from '@/components/student/StudentHeader';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050511]">
            <StudentHeader />
            <main className="min-h-[calc(100vh-4rem)]">
                {children}
            </main>
        </div>
    );
}
