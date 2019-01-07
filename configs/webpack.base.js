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
        test: /\.mp4$/,
        loader: 'file-loader',
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'px2rem-loader',
              options: {
                remUnit: 37.5  //1rem=多少像素 这里的设计稿是750px。
              }          
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [require('autoprefixer')] // 添加css中的浏览器前缀
              }
            },
            'less-loader',
          ]
        }),
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
  ]
}