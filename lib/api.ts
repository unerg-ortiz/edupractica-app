const API_URL = 'http://localhost:8000';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

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

// ── Content Review (Admin) ───────────────

export const contentReview = {
    /** Get all stages pending approval */
    getPending: (skip = 0, limit = 100) =>
        apiFetch(`/api/review/pending?skip=${skip}&limit=${limit}`),

    /** Get a specific stage by ID */
    getStage: (stageId: number) =>
        apiFetch(`/api/stages/${stageId}`),

    /** Approve or reject a stage */
    review: (stageId: number, approved: boolean, comment?: string) =>
        apiFetch(`/api/stages/${stageId}/review`, {
            method: 'POST',
            body: JSON.stringify({ approved, comment: comment || null }),
        }),
};

// ── Analytics ────────────────────────────

export const analytics = {
    getDashboard: () => apiFetch('/api/analytics/dashboard'),
    getProfessorSummary: () => apiFetch('/api/analytics/professor/summary'),
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

// ── Categories ───────────────────────────

export const categories = {
    getAll: () => apiFetch('/categories/'),
    get: (id: number) => apiFetch(`/categories/${id}`),
};
