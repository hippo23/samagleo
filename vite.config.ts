import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: '/samagleo',
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'raw-md',
      transform(code, id) {
        if (id.endsWith('.md')) {
          return `export default ${JSON.stringify(code)}`
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
