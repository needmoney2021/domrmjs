import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DOMRM',
      fileName: (format) => `domrm.${format}.js`,
      formats: ['umd', 'es'], // UMD for CDN, ESM for modern bundlers
    },
    rollupOptions: {
      external: ['jquery'], // 의존성은 외부 CDN에서 제공할 거니까 번들에 포함 X
      output: {
        globals: {
          jquery: '$',
        },
        name: 'DOMRM'
      },
    },
  },
  plugins: [dts()],
})
