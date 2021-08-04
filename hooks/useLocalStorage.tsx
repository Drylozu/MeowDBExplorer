import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string, initial: any) {
    const [value, setValue] = useState(() => {
        if (typeof window !== 'undefined') {
            const data = window.localStorage.getItem(key);
            if (data !== null) return JSON.parse(data);
        }
        return initial;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue, () => window.localStorage.removeItem(key)];
}