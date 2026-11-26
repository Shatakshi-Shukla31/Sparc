import { defineConfig } from 'vite';

// Relative base so a single build works both at the site root (Vercel)
// and under a sub-path such as https://www.iitrpr.ac.in/sparc2026/
export default defineConfig({
  base: './',
});
