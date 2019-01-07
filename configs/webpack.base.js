const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  // entry: ["babel-polyfill","./src/js/index.js","./src/js/test.js"],
  entry: ["./src/js/index.js","./src/js/test.js"],
  output: {
    path: path.resolve('./', 'dist'),
    // filename: 'js/[name].js'
    // filename: 'js/bundle-[hash].js'
    filename: 'js/[name]-[hash].js'
  },
  // devServer: {
  //   contentBase: "./public",//本地服务器所加载的页面所在的目录
  //   historyApiFallback: true,//不跳转
  //   inline: true//实时刷新
  // },
  module: {
    noParse: /jquery|lodash/, // 正则表达式 作用  不解析  提高速度 这么理解，其实大部分可以直接用 script 引入的类库，都可以使用 noParse 来优化，因为这些类库相对独立
    rules: [
      {
        test: /\.jsx?/,
        exclude: '/node_modules/',
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../assets/',
              outputPath:'/assets/'
            }  
          }
        ]
      }
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src'),
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'src/index.html', // 配置文件模板
      // 压缩 去掉所有空格
      minify: {
        collapseWhitespace: true //false | true
      },
    }),
    new ExtractTextPlugin('css/[name].css'),
    // 配置的全局常量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      TWO: '1+1', // const TWO = 1 + 1,
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
      }
    }),
  ],
  // proxy 用于配置 webpack-dev-server 将特定 URL 的请求代理到另外一台服务器上。当你有单独的后端开发服务器用于请求 API 时，这个配置相当有用
  // proxy: {
  //   '/api': {
  //     target: "http://localhost:3001", // 将 URL 中带有 /api 的请求代理到本地的 3001 端口的服务上
  //     pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
  //   },
  // }
}