import styles from './styles/index.css';

if (!localStorage.getItem('darkMode'))
    localStorage.setItem('darkMode', window.matchMedia('(prefers-color-scheme: dark)').matches);

const config = JSON.parse(localStorage.getItem('darkMode'));

if (config)
    document.body.classList.add(styles.darkTheme);