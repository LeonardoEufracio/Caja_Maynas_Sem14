import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Caja_Maynas_Sem14/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
})
