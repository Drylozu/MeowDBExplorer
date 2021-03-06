import styles from './styles/index.css';

if (!localStorage.getItem('darkMode'))
    localStorage.setItem('darkMode', window.matchMedia('(prefers-color-scheme: dark)').matches);

if (JSON.parse(localStorage.getItem('darkMode')))
    document.body.classList.add(styles.darkTheme);