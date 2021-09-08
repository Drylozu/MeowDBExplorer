import { useCallback, useEffect, useState } from 'react';

type LS<T = any> = [T, (value: T) => void, () => void];

export default function useLocalStorage<T extends any>(key: string, initial: T): LS<T> {
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
    }, [key, value]);

    const remove = useCallback(() => {
        window.localStorage.removeItem(key);
    }, [key]);

    return [value, setValue, remove];
}