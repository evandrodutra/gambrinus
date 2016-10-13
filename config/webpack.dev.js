const paths = require('./paths');
const babelConfig = require(paths.appPackageJson)["babel"]
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: paths.appSrc,

  entry: paths.appIndexJs,

  output: {
    path: paths.appBuild,
    publicPath: paths.publicPath,
    filename: '[id].[hash].bundle.js',
  },

  bail: true,

  watch: true,

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
        loader: 'style!' +
                'css?modules&importLoaders=1&localIdentName=[local]__[hash:base64:5]!' +
                'postcss!sass?includePaths[]=' + paths.appSrc,
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml
    })
  ],

  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [paths.appSrc]
  },

  devServer: {
    contentBase: paths.appPublic,
    publicPath: paths.publicPath,
    inline: true,
    hot: true,
    port: 9000,
    host: 'localhost',
    noInfo: true,
    open: true
  }
};
