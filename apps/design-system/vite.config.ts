// apps/design-system/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
const root = join(__dirname, '..', 'packages');
console.log("root", root)
export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
});

