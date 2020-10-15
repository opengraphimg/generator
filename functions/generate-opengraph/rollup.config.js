import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import replace from '@rollup/plugin-replace'

const config = {
  input: 'src/image.js',
  output: [
    {
      file: `image.js`,
      format: 'iife',
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    nodePolyfills(),
  ],
}

export default config
