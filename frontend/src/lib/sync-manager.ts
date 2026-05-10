import { offlineStore } from './offline-store';

export const syncManager = {
    async processQueue() {
        if (!navigator.onLine) return;

        const requests = await offlineStore.getAllRequests();
        if (requests.length === 0) return;

        console.log(`Processing ${requests.length} offline requests...`);

        for (const req of requests) {
            try {
                const response = await fetch(req.url, {
                    method: req.method,
                    headers: req.headers,
                    body: JSON.stringify(req.body),
                });

                if (response.ok) {
                    await offlineStore.removeRequest(req.id!);
                }
            } catch (error) {
                console.error('Failed to sync request:', error);
                // Keep in queue for next attempt
            }
        }
    },

    init() {
        if (typeof window === 'undefined') return;

        window.addEventListener('online', () => {
            console.log('Network restored. Starting sync...');
            this.processQueue();
        });

        // Periodic check every 30 seconds if online
        setInterval(() => {
            if (navigator.onLine) {
                this.processQueue();
            }
        }, 30000);
    }
};
