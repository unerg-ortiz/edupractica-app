import React from 'react';
import { useCategoryStore } from '@/store/categoryStore';
import { CategoryItem } from './CategoryItem';
import { Search, Plus } from 'lucide-react';
import { Category } from '@/types/schema';

interface CategoryListProps {
    onAddCategory: () => void;
    onEditCategory: (category: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ onAddCategory, onEditCategory }) => {
    const { categories, searchQuery, filter, setSearchQuery, setFilter, deleteCategory, getFilteredCategories } = useCategoryStore();

    const filteredCategories = getFilteredCategories();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {(['all', 'active', 'hidden', 'archived'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors whitespace-nowrap ${filter === f
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        No categories found.
                    </div>
                ) : (
                    filteredCategories.map((category) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            onEdit={onEditCategory}
                            onDelete={deleteCategory}
                        />
                    ))
                )}
            </div>

            <button
                onClick={onAddCategory}
                className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 rounded-full text-white shadow-xl shadow-blue-500/30 flex items-center justify-center hover:bg-blue-600 transition-transform hover:scale-105 active:scale-95 md:hidden"
            >
                <Plus size={24} />
            </button>
        </div>
    );
};
