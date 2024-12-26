import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { resolve } from "path";


export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UILibCore',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'], 
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true, // Enable source maps for debugging
    emptyOutDir: true, // Clean the output directory before building
  },
  plugins: [
    react(),
    dts({
      outDir: path.resolve(__dirname, 'dist/types'), // Emit type declarations
      insertTypesEntry: true, // Add a `types` entry point in `package.json`
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'), // Ensure correct tsconfig path
    }),
  ],
  root: resolve(__dirname, "src"),
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, '../../packages/core'), // Adjust path alias for package imports
    },
  },
  server: {
    port: 3000, // Set a custom dev server port
    open: "/index.html", // Open the browser when the server starts
    
  },
});
