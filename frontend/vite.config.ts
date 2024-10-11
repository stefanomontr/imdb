import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {nodeResolve} from '@rollup/plugin-node-resolve';
/// <reference types="vitest/config" />
/// <reference types="vite/client" />

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    nodeResolve({
      browser: true,
      resolveOnly: ['puppeteer-core'],
    })
  ],
  css: {
    modules: {
      localsConvention: "dashes"
    }
  },
  // @ts-expect-error test-config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  }
})
