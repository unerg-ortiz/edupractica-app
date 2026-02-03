import { create } from 'zustand';
import { Category } from '@/types/schema';


interface CategoryState {
    categories: Category[];
    searchQuery: string;
    filter: 'all' | 'active' | 'hidden' | 'archived';
    setSearchQuery: (query: string) => void;
    setFilter: (filter: 'all' | 'active' | 'hidden' | 'archived') => void;
    addCategory: (category: Omit<Category, 'id'>) => void;
    updateCategory: (id: string, updates: Partial<Category>) => void;
    deleteCategory: (id: string) => void;
    getFilteredCategories: () => Category[];
}

const initialCategories: Category[] = [
    { id: '1', name: 'Mathematics', description: 'Algebra, Geometry, and Calculus', icon: 'Calculator', isActive: true },
    { id: '2', name: 'Science', description: 'Physics, Biology, and Chemistry', icon: 'FlaskConical', isActive: true },
    { id: '3', name: 'History', description: 'World history and ancient civilizations', icon: 'BookOpen', isActive: true },
    { id: '4', name: 'Literature', description: 'Classical authors and modern works', icon: 'Book', isActive: true },
    { id: '5', name: 'Technology', description: 'Programming, AI, and digital skills', icon: 'Laptop', isActive: true },
    { id: '6', name: 'Geography', description: 'Cartography and global studies', icon: 'Globe', isActive: true },
];

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: initialCategories,
    searchQuery: '',
    filter: 'all',
    setSearchQuery: (query) => set({ searchQuery: query }),
    setFilter: (filter) => set({ filter }),
    addCategory: (category) =>
        set((state) => ({
            categories: [
                ...state.categories,
                { ...category, id: Math.random().toString(36).substr(2, 9) },
            ],
        })),
    updateCategory: (id, updates) =>
        set((state) => ({
            categories: state.categories.map((cat) =>
                cat.id === id ? { ...cat, ...updates } : cat
            ),
        })),
    deleteCategory: (id) =>
        set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
        })),
    getFilteredCategories: () => {
        const { categories, searchQuery, filter } = get();
        return categories.filter((cat) => {
            const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter =
                filter === 'all'
                    ? true
                    : filter === 'active'
                        ? cat.isActive
                        : filter === 'hidden'
                            ? !cat.isActive
                            : true; // archived logic tbd
            return matchesSearch && matchesFilter;
        });
    },
}));
