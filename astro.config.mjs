// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Use base path for GitHub Pages, root for Cloudflare Pages
  site: process.env.CF_PAGES
    ? 'https://prime.pages.dev'
    : 'https://adimov-eth.github.io',
  base: process.env.CF_PAGES ? '/' : '/p1',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});