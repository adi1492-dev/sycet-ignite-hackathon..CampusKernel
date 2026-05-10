import { offlineStore } from './offline-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    } as Record<string, string>;

    // If offline and not a GET request, queue it
    if (typeof window !== 'undefined' && !navigator.onLine && options.method && options.method !== 'GET') {
        console.warn('Offline: Queuing request for later sync', url);
        await offlineStore.addRequest({
            url,
            method: options.method,
            body: options.body ? JSON.parse(options.body as string) : null,
            headers,
        });
        
        return {
            ok: true,
            status: 202, // Accepted (Queued)
            json: async () => ({ message: 'Request queued offline', offline: true }),
        };
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });
        return response;
    } catch (error) {
        // If fetch fails due to network error, and it's not a GET, queue it
        if (options.method && options.method !== 'GET') {
            console.error('Network error, queuing request:', error);
            await offlineStore.addRequest({
                url,
                method: options.method,
                body: options.body ? JSON.parse(options.body as string) : null,
                headers,
            });
            return {
                ok: true,
                status: 202,
                json: async () => ({ message: 'Network error, request queued', offline: true }),
            };
        }
        throw error;
    }
}
