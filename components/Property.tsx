import { KeyboardEvent, useState } from 'react';
import Image from 'next/image';

import styles from '../styles/Explorer.module.css';

interface PropertyProps {
    data: any;
    id: string;
    last: boolean;
}

export default function Property({ id, data, last }: PropertyProps) {
    const [expanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);

    const changeEditing = () => {
        if (['object', 'undefined'].includes(typeof data)) return;
        setEditing(!editing);
    };

    const handleChange = (e: KeyboardEvent<HTMLInputElement>) => {
        if (['object', 'undefined'].includes(typeof data)) return;
        if (typeof data === 'number' && !/(\d)/g.test(e.key))
            e.preventDefault();
    };

    return (
        <div className={`${styles.property} ${expanded ? styles.spaceObject : ''}`}>
            {data !== null && typeof data === 'object' && Object.entries(data).length > 0
                ? <Image
                    width='10' height='10' src='/expand.svg' alt='Expand'
                    className={expanded ? styles.expand : undefined}
                    onClick={() => setExpanded(!expanded)} />
                : null}
            {id}:
            <div className={`${styles.value} ${styles[data === null ? 'undefined' : typeof data]} ${expanded ? styles.objectInside : ''}`}>
                {typeof data === 'string' ? '"' : ''}
                {expanded && data !== null
                    ? typeof data === 'object'
                        ? (data instanceof Array ? '[' : '{')
                        : ''
                    : null}
                {editing
                    ? <input
                        type='text'
                        onBlur={() => changeEditing()}
                        onKeyDown={(e) => handleChange(e)}
                        defaultValue={String(data)} />
                    : <div
                        onClick={() => changeEditing()}
                    ><PropertyValue value={data} expanded={expanded} /></div>}
                {expanded && data !== null
                    ? typeof data === 'object'
                        ? (data instanceof Array ? ']' : '}')
                        : ''
                    : null}
                {typeof data === 'string' ? '"' : ''}
                {!last && typeof data === 'object' ? ',' : ''}
            </div>
            {!last && typeof data !== 'object' ? ',' : ''}
        </div>
    );
}

interface PropertyKeyProps {
    value: any;
    expanded: boolean;
}

export function PropertyValue({ value, expanded }: PropertyKeyProps) {
    let data = String(value) as any;
    if (value !== null && typeof value === 'object') {
        const properties = Object.entries(value);
        data = '{';
        if (value instanceof Array)
            data = '[';

        if (expanded)
            data = <div className={styles.objectSpacing}>
                {properties.map(([p, v], i, a) => <Property key={i} id={p} data={v} last={Boolean(i === (a.length - 1))} />)}
            </div>;
        else data += `${properties.length > 0 ? '...' : ''}${value instanceof Array ? ']' : '}'}`;
    }

    return data;
}