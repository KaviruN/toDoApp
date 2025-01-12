import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/toDoApp/',  // Set the base to the GitHub Pages subdirectory
  plugins: [react()],
})
