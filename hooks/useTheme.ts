import { useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export type Theme = 'dark' | 'light';
export type SetThemeFunc = (newTheme: Theme) => void;

const themes: Theme[] = ['dark', 'light'];

export default function useTheme(defaultTheme: Theme = 'light'): [Theme, SetThemeFunc] {
    const [theme, setThemeStorage] = useLocalStorage<Theme>('theme', defaultTheme, true);

    useEffect(() => {
        if (!themes.includes(theme)) {
            setThemeStorage(defaultTheme);
        }
        const el = document.querySelector('html') as HTMLHtmlElement;
        const htmlTheme = el.getAttribute('data-theme') as Theme | null;
        if (htmlTheme !== theme) {
            el.setAttribute('data-theme', theme);
        }
    }, [theme, setThemeStorage]);

    const setTheme = useCallback((newTheme: Theme) => {
        if (newTheme !== theme && themes.includes(newTheme)) {
            setThemeStorage(newTheme);
        }
    }, [theme, setThemeStorage]);

    return [theme, setTheme];
}