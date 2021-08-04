import styles from '../styles/Explorer.module.css';
import Property from './Property';

export default function Tree({ data }: { data: any; }) {
    const tree = Object.entries(typeof data === 'object' && data !== null ? data : {})
        .map(([p, v], i, a) =>
            <Property key={i} id={p} data={v} last={Boolean(i === (a.length - 1))} />);
    return (tree.length === 0
        ? <div>{JSON.stringify(data)}</div>
        : <div>
            {data instanceof Array ? '[' : '{'}
            <div className={`${styles.object} ${styles.objectSpacing}`}>{tree}</div>
            {data instanceof Array ? ']' : '}'}
        </div>);
}
