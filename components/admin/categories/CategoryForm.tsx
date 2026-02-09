"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema, Category } from '@/types/schema';
import { IconPicker } from './IconPicker';
import { iconMap } from './iconMap';
import { useCategoryStore } from '@/store/categoryStore';
import { X, Check, AlertCircle, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface CategoryFormProps {
    initialData?: Category;
    onClose: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, onClose }) => {
    const t = useTranslations('Categories.form');
    const { addCategory, updateCategory, categories } = useCategoryStore();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isDirty },
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
    const isActiveValue = watch('isActive');
    const IconPreview = iconMap[selectedIconName];

    // Check for duplicates when name changes
    useEffect(() => {
        if (!nameValue || nameValue.trim() === '') {
            setIsDuplicate(false);
            return;
        }

        setIsCheckingDuplicate(true);
        const timer = setTimeout(() => {
            // Check if name exists in other categories (excluding current if editing)
            const duplicate = categories.some(
                cat =>
                    cat.name.toLowerCase() === nameValue.toLowerCase() &&
                    cat.id !== initialData?.id
            );
            setIsDuplicate(duplicate);
            setIsCheckingDuplicate(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [nameValue, categories, initialData?.id]);

    const onSubmitForm = (data: Category) => {
        if (isDuplicate) return;

        // Show confirmation modal before saving
        setShowConfirmation(true);
    };

    const handleConfirmSave = async () => {
        setIsSaving(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const formData = watch();

        if (initialData?.id) {
            updateCategory(initialData.id, formData);
        } else {
            addCategory(formData);
        }

        setIsSaving(false);
        setShowConfirmation(false);
        onClose();
    };

    const getValidationMessage = () => {
        if (!nameValue || nameValue.trim() === '') return null;
        if (isCheckingDuplicate) {
            return (
                <p className="text-blue-400 text-sm mt-2 flex items-center gap-2 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('checking')}
                </p>
            );
        }
        if (isDuplicate) {
            return (
                <p className="text-amber-400 text-sm mt-2 flex items-center gap-2 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
                    <AlertCircle className="w-4 h-4" />
                    {t('duplicate')}
                </p>
            );
        }
        if (!errors.name) {
            return (
                <p className="text-emerald-400 text-sm mt-2 flex items-center gap-2 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                    <Check className="w-4 h-4" />
                    {t('available')}
                </p>
            );
        }
        return null;
    };

    return (
        <>
            <div className="bg-[#0f1629] text-white rounded-3xl w-full max-w-3xl mx-auto shadow-2xl border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-b from-[#151b2d] to-[#0f1629]">
                    <h2 className="text-2xl font-bold tracking-tight">
                        {initialData ? t('editTitle') : t('newTitle')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                {t('nameLabel')}
                            </label>
                            <span className={clsx(
                                "text-xs font-medium",
                                (nameValue?.length || 0) > 45 ? "text-amber-400" : "text-gray-500"
                            )}>
                                {nameValue?.length || 0} / 50
                            </span>
                        </div>
                        <input
                            {...register('name')}
                            maxLength={50}
                            className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder={t('namePlaceholder')}
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {errors.name.message}
                            </p>
                        )}
                        {getValidationMessage()}
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {t('descriptionLabel')}
                        </label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            maxLength={200}
                            className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                            placeholder={t('descriptionPlaceholder')}
                        />
                        <div className="flex justify-end">
                            <span className="text-xs text-gray-500">
                                {descriptionValue?.length || 0} / 200
                            </span>
                        </div>
                    </div>

                    {/* Icon Picker */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            {t('iconLabel')}
                        </label>
                        <Controller
                            control={control}
                            name="icon"
                            render={({ field }) => (
                                <IconPicker
                                    selectedIcon={field.value || 'BookOpen'}
                                    onSelectIcon={field.onChange}
                                />
                            )}
                        />
                    </div>

                    {/* Active Toggle */}
                    <div className="flex items-center justify-between p-4 bg-[#0a0e1a] rounded-xl border border-white/10">
                        <div>
                            <p className="font-medium text-white">{t('activeLabel')}</p>
                            <p className="text-sm text-gray-500">{t('visibilityLabel')}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('isActive')}
                                className="sr-only peer"
                            />
                            <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    {/* Preview Section */}
                    <div className="pt-6 border-t border-white/10">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                            {t('preview')}
                        </h3>
                        <div className="bg-gradient-to-br from-[#0a0e1a] to-[#151b2d] p-6 rounded-2xl border border-white/10 flex items-center gap-5 shadow-xl">
                            <div className={clsx(
                                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all",
                                isActiveValue ? "bg-blue-600 shadow-blue-600/30" : "bg-gray-700 shadow-black/20"
                            )}>
                                {IconPreview && <IconPreview className="w-8 h-8 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-xl text-white mb-1 truncate">
                                    {nameValue || t('previewName')}
                                </h4>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                    {descriptionValue || t('previewDescription')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3.5 rounded-xl text-gray-300 font-bold hover:bg-white/5 transition-all border border-white/10"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isDuplicate || isCheckingDuplicate || !isDirty}
                            className={clsx(
                                "flex-1 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg",
                                isDuplicate || isCheckingDuplicate || !isDirty
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98]"
                            )}
                        >
                            {initialData ? t('save') : t('saveNew')}
                        </button>
                    </div>
                </form>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => !isSaving && setShowConfirmation(false)}
                    />

                    <div className="bg-[#151b2d] w-full max-w-md rounded-3xl p-8 relative z-10 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 shadow-2xl border border-white/10">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-blue-500/20">
                                <Check className="w-8 h-8 text-blue-500" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">
                                {t('confirmSave')}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                {t('confirmMessage')}
                            </p>

                            <div className="w-full space-y-3">
                                <button
                                    onClick={handleConfirmSave}
                                    disabled={isSaving}
                                    className={clsx(
                                        "w-full py-4 rounded-xl font-bold transition-all shadow-lg",
                                        isSaving
                                            ? "bg-gray-700 text-gray-500 cursor-wait"
                                            : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30 hover:shadow-blue-500/50"
                                    )}
                                >
                                    {isSaving ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Guardando...
                                        </span>
                                    ) : (
                                        t('confirmButton')
                                    )}
                                </button>

                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    disabled={isSaving}
                                    className="w-full py-3 text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {t('cancelButton')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
