import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Portal del personal: usa base de repositorio cuando se compila para GitHub Pages.
export default defineConfig(({ mode }) => ({
  base: mode === 'github' ? '/Caja_Maynas_Sem14/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
}))
