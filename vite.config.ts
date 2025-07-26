import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/package-scanner/', // for github pages deployment
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://platform.safetycli.com',
        changeOrigin: true,
      },
    },
  },
});
