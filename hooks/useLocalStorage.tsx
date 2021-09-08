import { useEffect, useState } from 'react';

export default function useLocalStorage<T extends any>(key: string, initial: T): [T, (value: T) => void, () => void] {
    const [value, setValue] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            const data = window.localStorage.getItem(key);
            if (data !== null)
                try {
                    return JSON.parse(data);
                } catch { }
        }
        return initial;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue, () => window.localStorage.removeItem(key)];
}