import React from 'react';
import { iconMap } from './iconMap';

interface IconPickerProps {
    selectedIcon: string;
    onSelectIcon: (iconName: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onSelectIcon }) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {Object.keys(iconMap).map((iconName) => {
                const Icon = iconMap[iconName];
                return (
                    <button
                        key={iconName}
                        type="button"
                        onClick={() => onSelectIcon(iconName)}
                        className={`p-4 rounded-xl flex items-center justify-center transition-colors ${selectedIcon === iconName
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <Icon size={24} />
                    </button>
                );
            })}
        </div>
    );
};
