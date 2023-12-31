import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../myMuiConfig.tsx';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import ContextProvider from '../src/store/Provider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { store } from '~/app_redux/store.ts';
import { Provider } from 'react-redux';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        // 🎉 only show error toasts if we already have data in the cache
        // which indicates a failed background update
        onError: () => {
            toast.error('Something went wrong at main');
        },
    }),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ContextProvider>
                    <ThemeProvider theme={theme}>
                        <QueryClientProvider client={queryClient}>
                            <Toaster />
                            <App />
                        </QueryClientProvider>
                    </ThemeProvider>
                </ContextProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
