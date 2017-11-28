import { resolve } from 'path';

import typescript from 'rollup-plugin-typescript2';
import closure from 'rollup-plugin-closure-compiler-js';
import packageInfo from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  input: 'src/index.ts',
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    typescript({
      cacheRoot: '.typescript-compile-cache',
      clean: isProd ? true : false,
    }),
  ],
};

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
};

console.log(Object.values(globals));

const devConfig =  Object.assign({}, baseConfig, {
  output: {
    file: 'examples/src/lib/index.js',
    format: 'es',
    sourcemap: 'inline',
  },
});

const commonjsConfig = Object.assign({}, baseConfig, {
  output: {
    file: packageInfo.main,
    format: 'cjs',
  },
});

const esConfig = Object.assign({}, baseConfig, {
  output: {
    file: packageInfo.module,
    format: 'es',
  },
});

const browserConfig = Object.assign({}, baseConfig, {
  name: 'ReactDynamicFont',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
  },
  output: {
    file: packageInfo['non-module'],
    format: 'iife',
  },
  plugins: [
    ...baseConfig.plugins,
    closure({
      compilationLevel: 'SIMPLE',
      languageIn: 'ECMASCRIPT5_STRICT',
      languageOut: 'ECMASCRIPT5_STRICT',
    }),
  ],
});

const config = isProd ? [commonjsConfig, esConfig, browserConfig] : devConfig;

export default config;
