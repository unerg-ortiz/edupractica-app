import React from 'react';
import { useTranslations } from 'next-intl';
import { Category } from '@/types/schema';
import { Pencil, Trash2 } from 'lucide-react';
import { getIcon } from './iconMap';

interface CategoryItemProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category, onEdit, onDelete }) => {
    const t = useTranslations('Categories.item');

    return (
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between group transition-all hover:bg-slate-800/80 border border-slate-800/50 hover:border-slate-700">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${category.isActive ? 'bg-blue-600 shadow-blue-500/20' : 'bg-slate-700 text-slate-400'}`}>
                    {getIcon(category.icon || 'BookOpen')}
                </div>
                <div>
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                    <p className="text-slate-400 text-sm line-clamp-1">{category.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(category)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    title={t('edit')}
                >
                    <Pencil size={18} />
                </button>
                <button
                    onClick={() => category.id && onDelete(category.id)}
                    className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    title={t('delete')}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};
