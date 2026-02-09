import React from 'react';
import { Gavel } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BlockUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
}

export default function BlockUserModal({ isOpen, onClose, onConfirm }: BlockUserModalProps) {
    const t = useTranslations('BlockModal');
    const [reason, setReason] = React.useState('spam');
    const [isConfirmed, setIsConfirmed] = React.useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#0B1120] rounded-3xl p-6 w-full max-w-md border border-white/10 shadow-2xl relative">
                {/* Drag Handle Indicator (Mock) */}
                <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6 opacity-50" />

                {/* Header Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <Gavel className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                {/* Title & Description */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-white mb-2">
                        {t('title')}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {t('description')}
                    </p>
                </div>

                {/* Reason Selection */}
                <div className="mb-6">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                        {t('reasonLabel')}
                    </label>
                    <div className="space-y-3">
                        {['spam', 'inappropriate', 'fraud'].map((r) => (
                            <label
                                key={r}
                                className={`flex items-center gap-3 p-4 rounded-xl border border-white/5 cursor-pointer transition-all ${reason === r
                                    ? 'bg-blue-600/10 border-blue-500'
                                    : 'bg-[#151b2d] hover:border-white/20'
                                    }`}
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="radio"
                                        name="blockReason"
                                        value={r}
                                        checked={reason === r}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${reason === r ? 'border-blue-500' : 'border-gray-500'
                                        }`}>
                                        {reason === r && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                                    </div>
                                </div>
                                <span className="text-white text-sm font-medium">
                                    {t(`reasons.${r}`)}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 flex gap-3 items-start">
                    <div className="relative flex items-center mt-0.5">
                        <input
                            type="checkbox"
                            checked={isConfirmed}
                            onChange={(e) => setIsConfirmed(e.target.checked)}
                            className="sr-only"
                            id="confirm-permanent"
                        />
                        <label htmlFor="confirm-permanent" className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer ${isConfirmed ? 'bg-red-500 border-red-500' : 'border-red-400'
                            }`}>
                            {isConfirmed && <div className="text-white text-xs font-bold">✓</div>}
                        </label>
                    </div>
                    <label htmlFor="confirm-permanent" className="text-red-200 text-xs leading-relaxed cursor-pointer select-none">
                        {t('confirmation')}
                    </label>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={() => onConfirm(reason)}
                        disabled={!isConfirmed}
                        className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${isConfirmed
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {t('confirmButton')}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        {t('cancelButton')}
                    </button>
                </div>
            </div>
        </div>
    );
}
