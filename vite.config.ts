import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [react()],
  base: '/tic-tac-toe-reactjs',
})
