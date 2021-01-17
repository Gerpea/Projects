module.exports = (api) => {
  // `api.file` - path to the file
  // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
  // `api.webpackLoaderContext` - loader context for complex use cases
  // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
  // `api.options` - the `postcssOptions` options

  if (/\.sss$/.test(api.file)) {
    return {
      parser: 'sugarss',
      plugins: [['postcss-short', { prefix: 'x' }], 'postcss-preset-env'],
    }
  }

  return {
    plugins: [['postcss-short', { prefix: 'x' }], 'postcss-preset-env'],
  }
}
