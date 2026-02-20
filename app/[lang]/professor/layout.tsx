import React from 'react';
import ProfessorSidebar from '@/components/professor/ProfessorSidebar';
import ProfessorBottomNav from '@/components/professor/ProfessorBottomNav';

export default function ProfessorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#080C14]">
            {/* Desktop Sidebar */}
            <ProfessorSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-24 lg:pb-0">
                    {children}
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <ProfessorBottomNav />
        </div>
    );
}
