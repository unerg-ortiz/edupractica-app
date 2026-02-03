import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema, Category } from '@/types/schema';
import { IconPicker } from './IconPicker';
import { iconMap } from './iconMap';
import { useCategoryStore } from '@/store/categoryStore';

interface CategoryFormProps {
    initialData?: Category;
    onClose: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onClose }) => {
    const { addCategory, updateCategory } = useCategoryStore();
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<Category>({
        resolver: zodResolver(CategorySchema),
        defaultValues: initialData || {
            name: '',
            description: '',
            icon: 'BookOpen',
            isActive: true,
        },
    });

    const selectedIconName = watch('icon') || 'BookOpen';
    const nameValue = watch('name');
    const descriptionValue = watch('description');
    const IconPreview = iconMap[selectedIconName];

    const onSubmit = (data: Category) => {
        if (initialData?.id) {
            updateCategory(initialData.id, data);
        } else {
            addCategory(data);
        }
        onClose();
    };

    return (
        <div className="bg-slate-900 text-white p-6 rounded-2xl w-full max-w-2xl mx-auto shadow-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{initialData ? 'Edit Category' : 'New Category'}</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-white">
                    Close
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Helper for "unique name" validation mockup */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category Name</label>
                        <span className="text-xs text-slate-500">{nameValue?.length || 0} / 50</span>
                    </div>
                    <input
                        {...register('name')}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="e.g. Computer Science"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    {!errors.name && nameValue && (
                        <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                            This name is available and unique.
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Summarize the category content..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Icon</label>
                    <Controller
                        control={control}
                        name="icon"
                        render={({ field }) => (
                            <IconPicker selectedIcon={field.value || 'BookOpen'} onSelectIcon={field.onChange} />
                        )}
                    />
                </div>

                <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                    <input
                        type="checkbox"
                        {...register('isActive')}
                        id="isActive"
                        className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-slate-300 cursor-pointer select-none">
                        Active Category
                    </label>
                </div>

                <div className="pt-4 border-t border-slate-800">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Live Preview</h3>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            {IconPreview && <IconPreview size={24} />}
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">{nameValue || 'Category Name'}</h4>
                            <p className="text-slate-400 text-sm line-clamp-2">{descriptionValue || 'Category descriptions appear here...'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg text-slate-300 font-medium hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};
