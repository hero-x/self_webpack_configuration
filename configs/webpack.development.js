const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
  devtool: 'source-map',
  devServer: {
    // contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    open:true,//自动打开浏览器
    // proxy 用于配置 webpack-dev-server 将特定 URL 的请求代理到另外一台服务器上。当你有单独的后端开发服务器用于请求 API 时，这个配置相当有用
    proxy: {
      '/api': {
        target: "http://localhost:3001", // 将 URL 中带有 /api 的请求代理到本地的 3001 端口的服务上
        pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../assets/',
              outputPath:'assets/'
            }  
          }
        ]
      },
    ],
  },

  // devServer: {
  //   port: '1234',
  //   before(app){
  //     app.get('/api/test.json', function(req, res) {
  //       res.json({ code: 200, message: 'hello world' })
  //     })
  //   },
  // },
  plugins: [
    // 配置的全局常量
    new webpack.DefinePlugin({
      BASEURL: JSON.stringify('//www.test.com/api'), // const BASEURL = '//www.test.com/api'
    }),
  ]
})

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true),
  })
)

module.exports = config
