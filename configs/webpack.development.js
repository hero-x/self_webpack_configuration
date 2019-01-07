const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
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
  ],
})

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true),
  })
)

module.exports = config
