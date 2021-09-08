import useTheme from '../hooks/useTheme';
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Layout.module.css';

export default function Layout({ children }: { children: ReactNode; }) {
    const [theme, setTheme] = useTheme();

    return (<>
        <div className={styles.navbar}>
            <Link href='/'>
                <a className={styles.logo}>
                    <Image src='/banner.svg' alt='MeowDB' width='130' height='40' />
                    <span>Explorer</span>
                </a>
            </Link>
            <div className={styles.rightSide}>
                <a href='https://github.com/Drylozu/MeowDB.js'>JavaScript</a>
                <a href='https://github.com/Drylozu/MeowDB.rb'>Ruby</a>
                <label className={styles.themeChanger}>
                    <input
                        type='checkbox'
                        checked={theme === 'light'}
                        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                    <div className={styles.slider}></div>
                </label>
            </div>
        </div>

        <div className={styles.page}>
            {children}
        </div>
    </>);
}
