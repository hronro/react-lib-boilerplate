import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import closure from 'rollup-plugin-closure-compiler-js';
import packageInfo from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const baseExternalDependencies = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  // currently we use TypeScript so we don't need `PropTypes`
  // 'prop-types': 'PropTypes',
}

const modularExternalDependencies = [
  ...Object.keys(baseExternalDependencies),
  ...Object.keys(packageInfo.dependencies || {})
]

const browserExternalDependencies = Object.keys(baseExternalDependencies)

const baseConfig = {
  input: 'src/index.ts',
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
      modulesOnly: true,
    }),
    typescript({
      cacheRoot: '.typescript-compile-cache',
      clean: isProd ? true : false,
    }),
  ],
};

const devConfig =  Object.assign({}, baseConfig, {
  external: modularExternalDependencies,
  output: {
    file: 'examples/src/lib/index.js',
    format: 'es',
    sourcemap: 'inline',
  },
});

const commonjsConfig = Object.assign({}, baseConfig, {
  external: modularExternalDependencies,
  output: {
    file: packageInfo.main,
    format: 'cjs',
  },
});

const esConfig = Object.assign({}, baseConfig, {
  external: modularExternalDependencies,
  output: {
    file: packageInfo.module,
    format: 'es',
  },
});

const browserConfig = Object.assign({}, baseConfig, {
  external: browserExternalDependencies,
  output: {
    name: 'MyComponent',
    file: packageInfo['non-module'],
    format: 'iife',
    globals: baseExternalDependencies,
  },
  plugins: [
    ...baseConfig.plugins,
    closure({
      compilationLevel: 'SIMPLE',
      languageIn: 'ECMASCRIPT5_STRICT',
      languageOut: 'ECMASCRIPT5_STRICT',
      rewritePolyfills: false,
    }),
  ],
});

const config = isProd ? [commonjsConfig, esConfig, browserConfig] : devConfig;

export default config;
