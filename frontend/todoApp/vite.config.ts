const path = require('path');
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'frontend/todoApp'), // Ensure this matches the location of your index.html
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: path.resolve(__dirname, 'frontend/todoApp/index.html'), // Ensure this matches the location of your index.html
    },
  },
});