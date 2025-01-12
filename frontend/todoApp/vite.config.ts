import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'frontend/todoApp', // Ensure this matches the location of your index.html
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'frontend/todoApp/index.html', // Ensure this matches the location of your index.html
    },
  },
});