import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import site from './src/data/site.json';

export default defineConfig({
  output: 'static',
  site: site.url || undefined,
  vite: { plugins: [tailwindcss()] },
});
