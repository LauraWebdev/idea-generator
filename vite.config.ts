import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/idea-generator/',
    plugins: [
        vue(),
        eslintPlugin({
            exclude: [
                'node_modules/**',
            ],
        }),
    ],
});
