import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'campuskernal-offline';
const STORE_NAME = 'request-queue';

export interface PendingRequest {
    id?: number;
    url: string;
    method: string;
    body: any;
    headers: Record<string, string>;
    timestamp: number;
}

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
    if (!dbPromise) {
        dbPromise = openDB(DB_NAME, 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                }
            },
        });
    }
    return dbPromise;
}

export const offlineStore = {
    async addRequest(request: Omit<PendingRequest, 'id' | 'timestamp'>) {
        const db = await getDB();
        return db.add(STORE_NAME, {
            ...request,
            timestamp: Date.now(),
        });
    },

    async getAllRequests(): Promise<PendingRequest[]> {
        const db = await getDB();
        return db.getAll(STORE_NAME);
    },

    async removeRequest(id: number) {
        const db = await getDB();
        return db.delete(STORE_NAME, id);
    },

    async clear() {
        const db = await getDB();
        return db.clear(STORE_NAME);
    }
};
