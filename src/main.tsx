import React from 'react';
import toast ,{Toaster} from "react-hot-toast"
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../myMuiConfig.tsx';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import ContextProvider from '../src/store/Provider.tsx';
const queryClient = new QueryClient({
    queryCache:new QueryCache({
        onError:(error:any)=>{
            toast.error(`Something went wrong: ${error.message}`)
            
        }
    })
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ContextProvider>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Toaster/>
                    <App />
                </QueryClientProvider>
            </ThemeProvider>
        </ContextProvider>
    </React.StrictMode>,
);
