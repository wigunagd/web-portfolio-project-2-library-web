import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// This safely defines __dirname for ESM environments
const __dirname = dirname(fileURLToPath(import.meta.url));


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
     "@": resolve(__dirname, "./src"),
    },
  },
})
