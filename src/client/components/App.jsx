import React, { createRef } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

import Home from './Home.jsx';
import Explorer from './Explorer.jsx';
import styles from '../styles/index.css';
import banner from '../assets/banner.svg';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.themeChanger = createRef();
    }

    toggleTheme() {
        const darkMode = localStorage.getItem('darkMode');
        localStorage.setItem('darkMode', !JSON.parse(darkMode));
        document.body.classList.toggle(styles.darkTheme);
    }

    componentDidMount() {
        const darkMode = localStorage.getItem('darkMode');
        if (JSON.parse(darkMode) && !document.body.classList.contains(styles.darkTheme))
            document.body.classList.add(styles.darkTheme);
        this.themeChanger.current.checked = !!JSON.parse(darkMode);
    }

    render() {
        return (<BrowserRouter>
            <div className={styles.navbar}>
                <Link to='/' className={styles.logo}>
                    <img src={banner} alt='MeowDB' width='130' height='40' />
                    <span>Explorer</span>
                </Link>
                <div className={styles.rightSide}>
                    <a href='https://github.com/Drylotrans/MeowDB.js'>JavaScript</a>
                    <a href='https://github.com/Drylotrans/MeowDB.rb'>Ruby</a>
                    <label className={styles.themeChanger}>
                        <input
                            type='checkbox'
                            onChange={() => this.toggleTheme()}
                            ref={this.themeChanger} />
                        <div className={styles.slider}></div>
                    </label>
                </div>
            </div>

            <div className={styles.page}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/explore' component={Explorer} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </BrowserRouter>);
    }
}