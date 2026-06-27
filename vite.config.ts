import { defineConfig } from 'vite';

// Project page on GitHub Pages is served from /sherman-willard/.
// `base` makes built asset URLs resolve correctly there; dev server is unaffected.
export default defineConfig({
  base: '/sherman-willard/',
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    target: 'es2022',
  },
});
