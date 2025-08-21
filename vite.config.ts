import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/webservice': {
        target: 'https://SEU_DOMINIO_AQUI',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})