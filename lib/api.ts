const API_URL = 'http://localhost:8000';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers: Record<string, string> = {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    // Merge custom headers, preserving any overrides
    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
        throw new Error(error.detail || response.statusText);
    }

    return response.json();
}

// ── Auth ─────────────────────────────────

export const auth = {
    signup: (data: any) => apiFetch('/users/signup', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    login: (formData: FormData) => {
        return fetch(`${API_URL}/login/access-token`, {
            method: 'POST',
            body: formData,
        }).then(async (res) => {
            if (!res.ok) {
                const error = await res.json().catch(() => ({ detail: 'Login failed' }));
                throw new Error(error.detail || res.statusText);
            }
            return res.json();
        });
    },
};

// ── Users ────────────────────────────────

export const users = {
    getStudents: (skip = 0, limit = 100) =>
        apiFetch(`/users/students?skip=${skip}&limit=${limit}`),
    getMe: () => apiFetch('/users/me'),
    updateMe: (data: { email?: string; full_name?: string; password?: string }) =>
        apiFetch('/users/me', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    deleteMe: () => apiFetch('/users/me', { method: 'DELETE' }),
};

// ── Content Review (Admin) ───────────────

export const contentReview = {
    /** Get all topics pending approval */
    getPending: (skip = 0, limit = 100) =>
        apiFetch(`/api/topics/pending/review?skip=${skip}&limit=${limit}`),

    /** Get a specific topic by ID for review */
    getTopic: (topicId: number) =>
        apiFetch(`/api/topics/${topicId}`),

    /** Approve or reject a topic */
    review: (topicId: number, approved: boolean, comment?: string) =>
        apiFetch(`/api/topics/${topicId}/review`, {
            method: 'POST',
            body: JSON.stringify({ approved, comment: comment || null }),
        }),
};

// ── Analytics ────────────────────────────

export const analytics = {
    getDashboard: () => apiFetch('/api/analytics/dashboard'),
    getProfessorSummary: () => apiFetch('/api/analytics/professor/summary'),
    exportExcel: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const response = await fetch(`${API_URL}/api/analytics/export/excel`, {
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
        });
        if (!response.ok) throw new Error('Error al exportar Excel');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    },
    exportPDF: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const response = await fetch(`${API_URL}/api/analytics/export/pdf`, {
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
        });
        if (!response.ok) throw new Error('Error al exportar PDF');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    },
};

// ── Stages ───────────────────────────────

export const stages = {
    /** Get stages for a category */
    getByCategory: (categoryId: number) =>
        apiFetch(`/api/categories/${categoryId}/stages`),

    /** Get stages with user progress */
    getWithProgress: (categoryId: number) =>
        apiFetch(`/api/categories/${categoryId}/stages/progress`),

    /** Get stages created by the current professor */
    getMyStages: (skip = 0, limit = 100) =>
        apiFetch(`/api/stages/me?skip=${skip}&limit=${limit}`),

    /** Create a new stage */
    create: (data: any) =>
        apiFetch('/api/stages', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    /** Update a stage */
    update: (stageId: number, data: any) =>
        apiFetch(`/api/stages/${stageId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    /** Delete a stage */
    delete: (stageId: number) =>
        apiFetch(`/api/stages/${stageId}`, {
            method: 'DELETE',
        }),

    /** Complete a stage */
    complete: (stageId: number) =>
        apiFetch(`/api/stages/${stageId}/complete`, {
            method: 'POST',
        }),
};

// ── Topics ───────────────────────────────

export const topics = {
    /** Get topics created by the current professor */
    getMyTopics: (skip = 0, limit = 100) =>
        apiFetch(`/api/topics/me?skip=${skip}&limit=${limit}`),

    /** Create a new topic */
    create: (data: any) =>
        apiFetch('/api/topics', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    /** Get a specific topic with its stages */
    get: (topicId: number) =>
        apiFetch(`/api/topics/${topicId}`),

    /** Add a stage to a topic */
    addStage: (topicId: number, data: any) =>
        apiFetch(`/api/topics/${topicId}/stages`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    /** Update a topic */
    update: (topicId: number, data: any) =>
        apiFetch(`/api/topics/${topicId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    /** Delete a topic */
    delete: (topicId: number) =>
        apiFetch(`/api/topics/${topicId}`, {
            method: 'DELETE',
        }),
};

// ── Categories ───────────────────────────

export const categories = {
    getAll: () => apiFetch('/categories/'),
    get: (id: number) => apiFetch(`/categories/${id}`),
};

export const mediaApi = {
    upload: (formData: FormData) => apiFetch('/api/media/upload', {
        method: 'POST',
        body: formData,
    }),
};
