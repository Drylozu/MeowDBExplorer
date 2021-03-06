import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import styles from '../styles/Home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storedJSON: false,
            redirect: false
        };
    }

    componentDidMount() {
        const data = localStorage.getItem('originalJSON');
        try {
            if (data === null) return;
            JSON.parse(data);
            this.setState({
                storedJSON: true
            });
        } catch { }
    }

    chooseFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            try {
                const data = JSON.parse(fileReader.result);
                localStorage.setItem('originalJSON', JSON.stringify(data));
                localStorage.setItem('actualJSON', JSON.stringify(data));
                this.setState({
                    redirect: true
                });
            } catch {
                alert('Please load a valid JSON');
            }
        };
        fileReader.readAsText(event.target.files[0]);
    }

    render() {
        return (this.state.redirect
            ? <Redirect to='/explore' />
            : <>
                <div className={styles.header}>
                    <p className={styles.title}>Welcome</p>
                </div>
                <div className={styles.center}>
                    <p className={styles.hint}>
                        {this.state.storedJSON
                            ? 'looks like you\'ve loaded a JSON before'
                            : 'to start, you must upload a JSON file.'}
                    </p>
                    {this.state.storedJSON
                        ? <>
                            <Link to='/explore' className={styles.button}>Continue exploring</Link>
                            <p>or</p>
                        </>
                        : null}
                    <input
                        type='file'
                        id='file'
                        multiple={false}
                        accept='application/json'
                        onChange={(e) => this.chooseFile(e)} />
                    <label htmlFor='file' className={styles.button}>Choose a file</label>
                </div>
            </>);
    }
}