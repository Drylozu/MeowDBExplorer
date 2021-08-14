import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import useLocalStorage from '../hooks/useLocalStorage';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';

export default function Home() {
    const [originalJSON, setOriginalJSON] = useLocalStorage<any>('originalJSON', null);
    const [_, setActualJSON] = useLocalStorage<any>('actualJSON', null);
    const router = useRouter();

    const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            try {
                const data = JSON.parse(fileReader.result?.toString() || '');
                setOriginalJSON(data);
                setActualJSON(data);
                router.push('/explore');
            } catch {
                alert('Please load a valid JSON');
            }
        };
        fileReader.readAsText(event.target.files[0]);
    };

    return (
        <Layout>
            <Head>
                <title>MeowDB Explorer</title>
            </Head>
            <div className={styles.header}>
                <p className={styles.title}>Welcome</p>
            </div>
            <div className={styles.center}>
                <p className={styles.hint}>
                    {originalJSON !== null
                        ? 'looks like you\'ve loaded a JSON before'
                        : 'to start, you must upload a JSON file.'}
                </p>
                {originalJSON !== null && <>
                    <Link href='/explore'>
                        <a className={styles.button}>Continue exploring</a>
                    </Link>
                    <p>or</p>
                </>}
                <input
                    type='file'
                    id='file'
                    multiple={false}
                    accept='application/json'
                    onChange={(e) => chooseFile(e)} />
                <label htmlFor='file' className={styles.button}>Choose a file</label>
            </div>
        </Layout>
    );
}
