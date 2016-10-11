/**
 * Dev mode config
 */

var webpack = require('webpack');
var path = require('path');

module.exports = {
//页面入口文件配置
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './scripts/index'
  ],
  //入口文件输出配置（打包后的文件信息）
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  //其它解决方案配置
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  //module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'scripts')
      },
      {
        test: /\.less?$/,
        loader: 'style!css!less'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
      // js: 'babel!eslint'
    }
  },
}