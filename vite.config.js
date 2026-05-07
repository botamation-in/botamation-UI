import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'BotamationUI',
      fileName: 'botamation-ui',
    },
    rollupOptions: {
      // Peer deps — don't bundle them
      external: ['react', 'react-dom', 'react/jsx-runtime', '@headlessui/react', 'framer-motion', 'clsx'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@headlessui/react': 'HeadlessUI',
          'framer-motion': 'FramerMotion',
          'clsx': 'clsx',
        },
      },
    },
    // Keep CSS extracted as dist/style.css
    cssCodeSplit: false,
  },
});
