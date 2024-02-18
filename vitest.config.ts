import { defineConfig } from 'vite'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
})
