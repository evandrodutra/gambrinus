const paths = require('./paths');
const babelConfig = require('./babel')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const publicPath = '/build/'

module.exports = {
  context: paths.appSrc,

  entry: paths.appIndexJs,

  output: {
    path: paths.appBuild,
    publicPath: paths.publicPath,
    filename: 'js/bundle-[hash].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: paths.appSrc,
        query: babelConfig
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss!sass?includePaths[]=' + paths.appSrc),
        include: paths.appSrc
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url',
        include: paths.appSrc,
        query: {
          limit: 8000
        }
      },
      {
        test: /\.svg$/,
        include: paths.appSrc,
        loader: 'raw'
      }
    ],
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],

  plugins: [
    new ExtractTextPlugin('css/bundle-[hash].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      template: paths.appHtml
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        toplevel: true,
      },
      warnings: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
  ],

  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [paths.appSrc]
  }
};