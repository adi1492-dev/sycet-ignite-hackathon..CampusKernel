'use client';

import { useEffect } from 'react';
import { syncManager } from '@/lib/sync-manager';

export function SyncInitializer() {
    useEffect(() => {
        syncManager.init();
    }, []);

    return null;
}
