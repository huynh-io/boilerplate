import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vite'
import ViteRails from 'vite-plugin-rails'

export default defineConfig({
  plugins: [
    ViteRails(),
    react(),
    tailwindcss(),
    TanStackRouterVite({
      routesDirectory: path.resolve(__dirname, 'app/frontend/routes'),
      generatedRouteTree: path.resolve(__dirname, 'app/frontend/routeTree.gen.ts'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/frontend'),
    },
  },
})
