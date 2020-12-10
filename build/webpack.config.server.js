const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.config.base')
const paths = require('./paths')
const isDev = process.env.NODE_ENV === 'development'

const node_env = process.env.NODE_ENV || 'development'
const plugins = [
  new webpack.DefinePlugin({
    '__isBrowser__': false, //eslint-disable-line
    '__ENV__': JSON.stringify(node_env)
  })
]

module.exports = merge(baseConfig, {
  devtool: isDev ? 'eval-source-map' : '',
  entry: {
    Page: paths.entry,
    Layout: paths.layout
  },
  target: 'node',
  externals: nodeExternals({
    whitelist: [/\.(css|less|sass|scss)$/, /^antd.*?.css/],
    modulesDir: paths.appNodeModules
  }),
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: plugins
})
