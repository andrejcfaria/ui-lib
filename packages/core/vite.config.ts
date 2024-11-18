// packages/core/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UILibCore',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        dir: path.resolve(__dirname, 'dist'),
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [
    react(),
    dts({
      outDir: path.resolve(__dirname, 'dist/types'),
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
    })
  ],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../../packages/core'),
    }
  }
});