import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/vue-progressive-img-esm.js'
  },
  plugins: [
    nodeResolve(),
    vue({
      css: true,
      template: {
        isProduction: true,
        compilerOptions: {
          whitespace: 'condense',
        },
      },
    }),
    commonjs(),
    json()
  ]
}
