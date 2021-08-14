import { useEffect, useCallback, useState, Dispatch, SetStateAction } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T, restoreOnDelete: boolean = false): [T, Dispatch<SetStateAction<T | undefined>>, () => void] {
    const deserializer = JSON.parse;
    const serializer = JSON.stringify;

    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        if (process.browser) {
            const localStorageValue = localStorage.getItem(key);
            if (localStorageValue !== null) {
                setState(deserializer(localStorageValue));
            } else {
                localStorage.setItem(key, serializer(initialValue));
                setState(initialValue);
            }
        }
    }, [key, process.browser]);

    const set: Dispatch<SetStateAction<T | undefined>> = useCallback((valOrFunc) => {
        try {
            const newState = typeof valOrFunc === 'function' ? (valOrFunc as Function)(state) : valOrFunc;
            if (typeof newState === 'undefined') return;
            const value: string = serializer(newState);
            localStorage.setItem(key, value);
            setState(deserializer(value));
        } catch {
        }
    }, [key, setState]);

    const remove = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setState(initialValue);
        } catch {
        }
    }, [key, setState]);

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key !== key) {
                return;
            }
            if (e.newValue && serializer(state) !== e.newValue) {
                set(deserializer(e.newValue));
            }
            else if (!e.newValue && restoreOnDelete) {
                set(initialValue);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [state, set, deserializer, serializer]);

    return [state, set, remove];
}
