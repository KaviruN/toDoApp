// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

interface LibOptions {
  entry: string;
  name: string;
  fileName: (format: string) => string;
}

interface RollupOptions {
  external: string[];
  output: {
    globals: {
      [key: string]: string;
    };
  };
}

interface BuildOptions {
  lib: LibOptions;
  rollupOptions: RollupOptions;
}

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      fileName: (format: string) => `my-lib.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  } as BuildOptions
})