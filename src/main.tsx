import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../myMuiConfig.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import ContextProvider from '../src/store/Provider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ContextProvider>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </ThemeProvider>
        </ContextProvider>
    </React.StrictMode>,
);
