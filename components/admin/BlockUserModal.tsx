import React from 'react';
import { UserX } from 'lucide-react';
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0B1120] rounded-3xl p-8 w-full max-w-md border border-white/5 shadow-2xl relative">
                {/* Drag Handle Indicator */}
                <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-8 app-region-drag" />

                {/* Header Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#1e293b] rounded-full flex items-center justify-center relative">
                        <UserX className="w-8 h-8 text-blue-500 fill-blue-500/10" />
                        {/* Strikethrough effect visual enhancement if needed, but UserX is good */}
                    </div>
                </div>

                {/* Title & Description */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-white mb-3">
                        {t('title')}
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed px-4">
                        {t('description')}
                    </p>
                </div>

                {/* Reason Selection */}
                <div className="mb-6">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block pl-1">
                        {t('reasonLabel')}
                    </label>
                    <div className="space-y-3">
                        {['spam', 'inappropriate', 'fraud'].map((r) => (
                            <label
                                key={r}
                                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all group ${reason === r
                                    ? 'bg-blue-600/10 border-blue-500/50'
                                    : 'bg-[#121827] border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className="relative flex items-center justify-center shrink-0">
                                    <input
                                        type="radio"
                                        name="blockReason"
                                        value={r}
                                        checked={reason === r}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="peer sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${reason === r
                                        ? 'border-blue-500'
                                        : 'border-slate-600 group-hover:border-slate-500'
                                        }`}>
                                        <div className={`w-2.5 h-2.5 rounded-full bg-blue-500 transition-transform ${reason === r ? 'scale-100' : 'scale-0'}`} />
                                    </div>
                                </div>
                                <span className={`text-sm font-medium transition-colors ${reason === r ? 'text-white' : 'text-slate-300'}`}>
                                    {t(`reasons.${r}`)}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 mb-8 flex gap-3 items-start group hover:border-red-500/20 transition-colors">
                    <div className="relative flex items-center mt-0.5 shrink-0">
                        <input
                            type="checkbox"
                            checked={isConfirmed}
                            onChange={(e) => setIsConfirmed(e.target.checked)}
                            className="peer sr-only"
                            id="confirm-permanent"
                        />
                        <label
                            htmlFor="confirm-permanent"
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${isConfirmed
                                ? 'bg-transparent border-red-500'
                                : 'border-red-900/50 group-hover:border-red-800/50'
                                }`}
                        >
                            <div className={`w-2.5 h-2.5 rounded-full bg-red-500 transition-transform ${isConfirmed ? 'scale-100' : 'scale-0'}`} />
                        </label>
                    </div>
                    <label htmlFor="confirm-permanent" className="text-red-400/80 text-xs leading-relaxed cursor-pointer select-none font-medium">
                        {t('confirmation')}
                    </label>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={() => onConfirm(reason)}
                        disabled={!isConfirmed}
                        className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-[0.98] ${isConfirmed
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25'
                            : 'bg-[#1e293b] text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        {t('confirmButton')}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-sm text-slate-500 hover:text-white transition-colors font-medium"
                    >
                        {t('cancelButton')}
                    </button>
                </div>
            </div>
        </div>
    );
}
