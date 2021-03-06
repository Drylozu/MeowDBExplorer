import React from 'react';
import { Redirect } from 'react-router-dom';
import DownloadLink from 'react-download-link';

import Property from './Property.jsx';
import styles from '../styles/Explorer.css';

export default class Explorer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goBack: false,
            actualJSON: {}
        };
    }

    deleteAll() {
        localStorage.removeItem('originalJSON');
        localStorage.removeItem('actualJSON');
        this.setState({
            goBack: true
        });
    }

    exportFile() {
        return JSON.stringify(this.state.actualJSON);
    }

    exportOriginalFile() {
        return localStorage.getItem('originalJSON');
    }

    renderTree() {
        if (!this.state.actualJSON) return;
        const data = Object.entries(this.state.actualJSON)
            .map(([p, v], i, a) =>
                <Property key={i} id={p} data={v} last={Boolean(i === (a.length - 1))} />);
        return (data.length === 0
            ? '{}'
            : <div>
                {this.state.actualJSON instanceof Array ? '[' : '{'}
                <div className={`${styles.object} ${styles.objectSpacing}`}>{data}</div>
                {this.state.actualJSON instanceof Array ? ']' : '}'}
            </div>);
    }

    componentDidMount() {
        const original = localStorage.getItem('originalJSON');
        try {
            JSON.parse(original);
            this.setState({
                actualJSON: JSON.parse(original)
            });
        } catch {
            this.setState({ goBack: true });
        }
    }

    render() {
        return (this.state.goBack
            ? <Redirect to='/' />
            : <>
                <div className={styles.utils}>
                    <a className={styles.button}
                        onClick={() => this.setState({ goBack: true })}
                    >Go back</a>
                    <DownloadLink
                        style={null}
                        className={styles.button}
                        exportFile={this.exportOriginalFile}
                        label='Download original JSON'
                        filename='original.json' />
                    <a className={styles.button}
                        style={{ color: '#ff0000' }}
                        onClick={() => this.deleteAll()}
                    >Delete all</a>
                </div>
                <div className={styles.tree}>{this.renderTree(this.state.loadedJSON)}</div>
            </>);
    }
}