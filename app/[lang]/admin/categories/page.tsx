'use client';

import React, { useState } from 'react';
import { CategoryList } from '@/components/admin/categories/CategoryList';
import { CategoryForm } from '@/components/admin/categories/CategoryForm';
import { Category } from '@/types/schema';
import { ChevronLeft, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { AdminBottomNav } from '@/components/admin/AdminBottomNav';

export default function CategoriesPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

    const handleAddClick = () => {
        setEditingCategory(undefined);
        setIsFormOpen(true);
    };

    const handleEditClick = (category: Category) => {
        setEditingCategory(category);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingCategory(undefined);
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-blue-500/30 pb-24">
            <div className="max-w-4xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Manage Categories</h1>
                    </div>
                    <button
                        onClick={handleAddClick}
                        className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <Plus size={20} />
                        <span>Add Category</span>
                    </button>
                    <button className="md:hidden p-2 text-slate-400">
                        <Settings size={24} />
                    </button>
                </div>

                {/* Content */}
                <CategoryList onAddCategory={handleAddClick} onEditCategory={handleEditClick} />

                {/* Modal Overlay */}
                {isFormOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="w-full max-w-2xl animate-in zoom-in-95 duration-200">
                            <CategoryForm initialData={editingCategory} onClose={handleFormClose} />
                        </div>
                    </div>
                )}

                <AdminBottomNav />
            </div>
        </div>
    );
}
