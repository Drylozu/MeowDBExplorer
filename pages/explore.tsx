import DownloadLink from 'react-download-link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

import { PropertyValue } from '../components/Property';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from '../styles/Explorer.module.css';
import Layout from '../components/Layout';
import Tree from '../components/Tree';

export default function Explorer() {
    const [originalJSON, _, deleteOriginalJSON] = useLocalStorage('originalJSON', null);
    const [actualJSON, __, deleteActualJSON] = useLocalStorage('actualJSON', {});
    const router = useRouter();

    const deleteAll = () => {
        deleteOriginalJSON();
        deleteActualJSON();
        router.push('/');
    };

    useEffect(() => {
        if (!originalJSON)
            router.push('/');
    }, []);


    return (
        <Layout>
            <Head>
                <title>Explore - MeowDB Explorer</title>
            </Head>
            <div className={styles.utils}>
                <a className={styles.button}
                    onClick={() => router.push('/')}
                >Go back</a>
                <DownloadLink
                    style={{}}
                    /* @ts-ignore */
                    className={styles.button}
                    exportFile={() => originalJSON || ''}
                    label='Download original JSON'
                    filename='original.json' />
                <a className={styles.button}
                    style={{ color: '#ff0000' }}
                    onClick={() => deleteAll()}
                >Delete all</a>
            </div>
            <div className={styles.tree}>
                {typeof actualJSON === 'object' && actualJSON !== null ?
                    <Tree data={actualJSON} />
                    : <PropertyValue value={actualJSON} expanded={false} />}
            </div>
        </Layout>
    );
}
