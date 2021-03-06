const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  watch: true,
  watchOptions: {
    ignored: 'node_modules/**',
  },
  ignoreWarnings: [
    {
      module: /.*mongo.*/,
    },
    {
      module: /.*require_optional.*/,
    },
    {
      module: /.*formidable.*/,
    },
    {
      module: /.*ws.*/,
    },
    {
      module: /.*natural.*/,
    },
    {
      module: /.*express.*/,
    },
  ],
})
