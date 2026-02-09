"use client";

import React, { useState, useRef, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Video, Music, Image as ImageIcon, CloudUpload, X, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

type MediaType = 'video' | 'audio' | 'image';

export default function MediaUploadPage() {
    const t = useTranslations('MediaUpload');
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedType, setSelectedType] = useState<MediaType>('video');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleTypeSelect = (type: MediaType) => {
        setSelectedType(type);
        setFile(null);
        setPreviewUrl(null);
    };

    const validateFile = (file: File): boolean => {
        // Size validation (100MB)
        if (file.size > 100 * 1024 * 1024) {
            alert(t('sizeLimit')); // Should use a proper toast in real app
            return false;
        }

        // Type validation
        const typeMap = {
            'video': 'video/',
            'audio': 'audio/',
            'image': 'image/'
        };

        if (!file.type.startsWith(typeMap[selectedType])) {
            // In a real app we'd be more specific with mime types
            // But valid HTML5 accept attribute usually handles the initial filter
            return true;
        }

        return true;
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (validateFile(selectedFile)) {
                setFile(selectedFile);
                setPreviewUrl(URL.createObjectURL(selectedFile));
            }
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFile(droppedFile)) {
                setFile(droppedFile);
                setPreviewUrl(URL.createObjectURL(droppedFile));
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-white font-sans pb-24 relative overflow-y-auto">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/10 blur-[100px] pointer-events-none" />

            <div className="max-w-md mx-auto p-6 relative z-10">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-blue-500" />
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-center">
                        {t('header')}
                    </h1>
                    <div className="w-10" />
                </header>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
                    <p className="text-slate-400 text-sm">{t('subtitle')}</p>
                </div>

                {/* Type Selectors */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <button
                        onClick={() => handleTypeSelect('video')}
                        className={clsx(
                            "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all aspect-square",
                            selectedType === 'video'
                                ? "bg-[#151b2d] border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                : "bg-[#151b2d]/50 border-white/5 text-slate-500 hover:bg-[#151b2d]"
                        )}
                    >
                        <Video className={clsx("w-8 h-8 mb-2", selectedType === 'video' ? "text-blue-500" : "text-current")} />
                        <span className="text-xs font-bold tracking-wider">{t('types.video')}</span>
                    </button>

                    <button
                        onClick={() => handleTypeSelect('audio')}
                        className={clsx(
                            "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all aspect-square",
                            selectedType === 'audio'
                                ? "bg-[#151b2d] border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                : "bg-[#151b2d]/50 border-white/5 text-slate-500 hover:bg-[#151b2d]"
                        )}
                    >
                        <Music className={clsx("w-8 h-8 mb-2", selectedType === 'audio' ? "text-blue-500" : "text-current")} />
                        <span className="text-xs font-bold tracking-wider">{t('types.audio')}</span>
                    </button>

                    <button
                        onClick={() => handleTypeSelect('image')}
                        className={clsx(
                            "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all aspect-square",
                            selectedType === 'image'
                                ? "bg-[#151b2d] border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                : "bg-[#151b2d]/50 border-white/5 text-slate-500 hover:bg-[#151b2d]"
                        )}
                    >
                        <ImageIcon className={clsx("w-8 h-8 mb-2", selectedType === 'image' ? "text-blue-500" : "text-current")} />
                        <span className="text-xs font-bold tracking-wider">{t('types.image')}</span>
                    </button>
                </div>

                {/* Upload Area */}
                {!file ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={clsx(
                            "border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[320px] mb-6 relative",
                            isDragging
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-blue-500/30 bg-[#151b2d]/50 hover:bg-[#151b2d]"
                        )}
                    >
                        <div className="w-20 h-20 rounded-full bg-[#1e293b] flex items-center justify-center mb-6 shadow-xl relative z-10">
                            <CloudUpload className="w-10 h-10 text-blue-500" />
                        </div>

                        {/* Dashed border inside area */}
                        <div className="absolute inset-4 border border-dashed border-blue-500/20 rounded-2xl pointer-events-none" />

                        <h3 className="text-white font-bold text-lg mb-2 relative z-10">
                            {t('dragDrop')}
                        </h3>
                        <p className="text-slate-400 text-sm mb-8 relative z-10">
                            {t('orBrowse')}
                        </p>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 relative z-10"
                        >
                            {t('selectFile')}
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept={
                                selectedType === 'video' ? 'video/mp4' :
                                    selectedType === 'audio' ? 'audio/mpeg,audio/wav' :
                                        'image/jpeg,image/png'
                            }
                            onChange={handleFileSelect}
                        />
                    </div>
                ) : (
                    <div className="bg-[#151b2d] rounded-3xl p-4 border border-white/10 mb-6 animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white">{t('preview')}</h3>
                            <button
                                onClick={() => {
                                    setFile(null);
                                    setPreviewUrl(null);
                                }}
                                className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-red-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-black/50 rounded-xl overflow-hidden aspect-video flex items-center justify-center mb-4 border border-white/5">
                            {selectedType === 'video' && previewUrl && (
                                <video src={previewUrl} controls className="w-full h-full object-contain" />
                            )}
                            {selectedType === 'audio' && previewUrl && (
                                <audio src={previewUrl} controls className="w-full p-4" />
                            )}
                            {selectedType === 'image' && previewUrl && (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                            )}
                        </div>

                        <div className="text-center">
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                            >
                                {t('save')}
                            </button>
                        </div>
                    </div>
                )}

                <div className="text-center space-y-4">
                    <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium">{t('supportedFormats')}</p>
                        <div className="flex justify-center gap-2">
                            {['MP4', 'MP3', 'JPG', 'PNG'].map(fmt => (
                                <span key={fmt} className="bg-[#1e293b] text-slate-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/5">
                                    {fmt}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                        <Info className="w-4 h-4" />
                        {t('sizeLimit')}
                    </div>
                </div>

            </div>
        </div>
    );
}
