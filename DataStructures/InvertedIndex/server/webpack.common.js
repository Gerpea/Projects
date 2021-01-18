const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
const dotenv = require('dotenv').config({ path: __dirname + '/.env' })

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
  },
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env': dotenv.parsed,
    }),
  ],
}
