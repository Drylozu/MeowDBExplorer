import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider enableColorScheme={false}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default App;