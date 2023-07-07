import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
//changer import in vite.config.ts and tsconfig.json change two files position 1/3 
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default (mode) => {
    const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        plugins: [react(),tsconfigPaths()],
        server: {
            port: parseInt(env.VITE_PORT),
        },
        //changer import in vite.config.ts and tsconfig.json change two files position 2/3
        resolve: {
            alias: {
                "~":'/src',
            },
        },
    });
};
