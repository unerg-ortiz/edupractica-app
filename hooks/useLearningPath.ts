import { useState } from 'react';

// Types for our stages
export type StageStatus = 'completed' | 'active' | 'locked';

export interface Stage {
    id: number;
    title: string;
    subtitle?: string; // For "Completed • 5/5 Lessons" etc.
    status: StageStatus;
    progress?: number; // 0 to 100
    lessonsTotal?: number;
    lessonsCompleted?: number;
}

export const useLearningPath = () => {
    // ViewModel Logic
    // In a real app, this would fetch data from a service

    const [stages] = useState<Stage[]>([
        {
            id: 1,
            title: "Introducción al Pensamiento Creativo",
            subtitle: "Completado • 5/5 Lecciones",
            status: "completed",
        },
        {
            id: 2,
            title: "Fundamentos Básicos",
            subtitle: "Etapa Actual • 4/10 Lecciones",
            status: "active",
            progress: 40,
        },
        {
            id: 3,
            title: "Técnicas Avanzadas",
            subtitle: "Bloqueado • Completa la etapa anterior",
            status: "locked",
        },
        {
            id: 4,
            title: "Dominio y Proyectos",
            subtitle: "Bloqueado",
            status: "locked",
        },
        {
            id: 5,
            title: "Certificación Final",
            status: "locked",
        }
    ]);

    const overallProgress = 35; // 35% in top corner

    return {
        stages,
        overallProgress
    };
}
