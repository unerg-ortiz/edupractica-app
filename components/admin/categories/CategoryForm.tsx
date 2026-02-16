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
            <div className="bg-[#0b1120] text-white rounded-3xl w-full h-full md:h-auto md:max-h-[90vh] shadow-2xl border border-white/5 overflow-y-auto scrollbar-hide flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-white/5 bg-[#0b1120] sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="md:hidden">
                            <span className="text-xl">‹</span>
                        </button>
                        <h2 className="text-lg font-bold tracking-wide">
                            {initialData ? t('editTitle') : 'Editor de Categoría'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        {t('close')}
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmitForm)} className="flex-1 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

                        {/* LEFT COLUMN - Editable Fields */}
                        <div className="md:col-span-7 space-y-8">
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                                    CAMPOS EDITABLES
                                </h3>

                                {/* Name Field */}
                                <div className="space-y-3 mb-6">
                                    <label className="text-sm font-medium text-gray-300">
                                        {t('nameLabel')}
                                    </label>
                                    <div className="relative group">
                                        <input
                                            {...register('name')}
                                            maxLength={50}
                                            className="w-full bg-[#131b2e] border border-white/5 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium"
                                            placeholder={t('namePlaceholder')}
                                        />
                                        {!isDuplicate && !isCheckingDuplicate && nameValue && !errors.name && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-[#0b1120] stroke-[3]" />
                                            </div>
                                        )}
                                    </div>
                                    {getValidationMessage()}
                                    {errors.name && (
                                        <p className="text-red-400 text-sm flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Description Field */}
                                <div className="space-y-3 mb-6">
                                    <label className="text-sm font-medium text-gray-300">
                                        {t('descriptionLabel')}
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        rows={5}
                                        maxLength={200}
                                        className="w-full bg-[#131b2e] border border-white/5 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none leading-relaxed"
                                        placeholder={t('descriptionPlaceholder')}
                                    />
                                    <div className="flex justify-end">
                                        <span className="text-xs text-gray-600">
                                            {descriptionValue?.length || 0} / 200
                                        </span>
                                    </div>
                                </div>

                                {/* Icon Picker (Kept for functionality, though not in screenshot) */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-300">
                                        Icono de la Categoría
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
                            </div>

                            {/* Desktop Save Button Position (Bottom of Left Column) */}
                            <div className="hidden md:block pt-8">
                                <button
                                    type="submit"
                                    disabled={isDuplicate || isCheckingDuplicate || !isDirty}
                                    className={clsx(
                                        "px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2",
                                        isDuplicate || isCheckingDuplicate || !isDirty
                                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-[0.98]"
                                    )}
                                >
                                    <span className="w-5 h-5 bg-white rounded flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-[1px]" />
                                    </span>
                                    {t('save')}
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Stats & Preview */}
                        <div className="md:col-span-5 space-y-8">

                            {/* Auto-save Card */}
                            <div className="bg-[#131b2e] rounded-2xl p-5 border border-white/5 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-white mb-1">Auto-guardado</h4>
                                    <p className="text-xs text-gray-500">Último guardado: hace 2 min</p>
                                </div>
                                <div className="w-12 h-7 bg-blue-600 rounded-full relative cursor-pointer">
                                    <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                                    VISTA PREVIA ESTUDIANTE
                                </h3>

                                {/* 3D Preview Card */}
                                <div className="bg-[#0f1523] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                                    {/* Card Image Area */}
                                    <div className="h-44 bg-gradient-to-br from-blue-900/40 to-[#0f1523] relative flex items-center justify-center overflow-hidden">
                                        {/* Abstract Blue Shapes (CSS Shapes) */}
                                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
                                        <div className="absolute left-10 top-10 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl" />

                                        {/* Mock 3D Elements */}
                                        <div className="relative z-10 w-full h-full flex items-center justify-center opacity-80">
                                            {IconPreview ? <IconPreview className="w-24 h-24 text-blue-500/50 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" /> : null}
                                        </div>

                                        <div className="absolute top-4 left-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                                            NUEVO
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">
                                        <h4 className="text-lg font-bold text-white mb-2 truncate">
                                            {nameValue || 'Matemáticas Avanzadas'}
                                        </h4>
                                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-6 h-10">
                                            {descriptionValue || 'Explora conceptos complejos como cálculo multivariable, álgebra lineal profunda...'}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-[#0f1523]" />
                                                <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-[#0f1523]" />
                                            </div>
                                            <span className="text-blue-500 text-xs font-bold hover:text-blue-400 cursor-pointer transition-colors">
                                                Ver detalles
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Mobile Only: Save Button (Sticky Bottom or just bottom) */}
                    <div className="md:hidden pt-8">
                        <button
                            type="submit"
                            disabled={isDuplicate || isCheckingDuplicate || !isDirty}
                            className="w-full py-4 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all"
                        >
                            {t('save')}
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
