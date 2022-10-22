import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cloudflarePagesFunctions from 'vite-plugin-cloudflare-functions';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cloudflarePagesFunctions({ dts: 'cloudflare.d.ts.log' })],
});
