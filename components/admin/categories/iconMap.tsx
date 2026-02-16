import {
    Calculator,
    FlaskConical,
    BookOpen,
    Book,
    Laptop,
    Globe,
    Palette,
    Languages,
    Gavel,
    Music,
    Code,
    Atom,
    Dna,
    Microscope,
    Database,
    Server,
    Cloud,
    Cpu,
    Smartphone,
    Wifi
} from 'lucide-react';
import React from 'react';

export const iconMap: Record<string, React.ElementType> = {
    Calculator,
    FlaskConical,
    BookOpen,
    Book,
    Laptop,
    Globe,
    Palette,
    Languages,
    Gavel,
    Music,
    Code,
    Atom,
    Dna,
    Microscope,
    Database,
    Server,
    Cloud,
    Cpu,
    Smartphone,
    Wifi
};

export const getIcon = (name: string) => {
    const Icon = iconMap[name];
    return Icon ? <Icon /> : <BookOpen />;
};
