import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  build: {
    rollupOptions: {
      input: {
        index: 'src/index.tsx',
        'package/components/increment': 'src/components/Increment.tsx'
      }
    }
  },
  server: {
    port: 4000,
  }
})
