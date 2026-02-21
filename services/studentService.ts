import { apiFetch } from '@/lib/api';

export interface CategoryProgress {
    id: number;
    name: string;
    description: string;
    icon_name: string;
    total_stages: number;
    completed_stages: number;
    progress_percentage: number;
}

export interface StudentDashboardStats {
    total_categories: number;
    completed_stages: number;
    in_progress: number;
    overall_progress: number;
    categories_progress: CategoryProgress[];
}

export const studentService = {
    /**
     * Get dashboard statistics for the current student
     */
    getDashboardStats: async (): Promise<StudentDashboardStats> => {
        try {
            const categories = await apiFetch('/categories/');
            
            // For each category, get progress
            const categoriesWithProgress = await Promise.all(
                categories.map(async (category: any) => {
                    try {
                        const stages = await apiFetch(`/api/categories/${category.id}/stages/progress`);
                        const totalStages = stages.length;
                        const completedStages = stages.filter((s: any) => s.is_completed).length;
                        
                        return {
                            id: category.id,
                            name: category.name,
                            description: category.description || '',
                            icon_name: category.icon_name || 'BookOpen',
                            total_stages: totalStages,
                            completed_stages: completedStages,
                            progress_percentage: totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0
                        };
                    } catch (error) {
                        return {
                            id: category.id,
                            name: category.name,
                            description: category.description || '',
                            icon_name: category.icon_name || 'BookOpen',
                            total_stages: 0,
                            completed_stages: 0,
                            progress_percentage: 0
                        };
                    }
                })
            );

            const totalStages = categoriesWithProgress.reduce((sum, cat) => sum + cat.total_stages, 0);
            const totalCompleted = categoriesWithProgress.reduce((sum, cat) => sum + cat.completed_stages, 0);
            const inProgress = categoriesWithProgress.filter(cat => cat.completed_stages > 0 && cat.completed_stages < cat.total_stages).length;
            
            return {
                total_categories: categories.length,
                completed_stages: totalCompleted,
                in_progress: inProgress,
                overall_progress: totalStages > 0 ? Math.round((totalCompleted / totalStages) * 100) : 0,
                categories_progress: categoriesWithProgress
            };
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },

    /**
     * Get stages with progress for a specific category
     */
    getCategoryStages: async (categoryId: number) => {
        return apiFetch(`/api/categories/${categoryId}/stages/progress`);
    },

    /**
     * Complete a stage
     */
    completeStage: async (stageId: number) => {
        return apiFetch(`/api/stages/${stageId}/complete`, {
            method: 'POST'
        });
    }
};
