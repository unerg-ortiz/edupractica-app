const API_URL = 'http://localhost:8000';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

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
