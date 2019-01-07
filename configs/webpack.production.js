const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.base')
const CleanWebpackPlugin = require('clean-webpack-plugin') //清除缓存
let pathsToClean = ['dist']
let cleanOptions = {
  root:    '/learn/base_webpack/', //根目录  不然找不到
  // exclude:  ['shared.js'],//排除清理的文件
  verbose:  true, //Write logs to console.
  dry:      false
}
const config = merge.smart(baseConfig, {
  module: {
    rules: [
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
      },
    ],
  },
  plugins: [
    // 配置的全局常量
    new webpack.DefinePlugin({
      BASEURL: JSON.stringify('//www.pro.com/api'), // const BASEURL = '//www.test.com/api'
    }),
    new webpack.BannerPlugin('--版权所有，翻版必究!!!'),
    new CleanWebpackPlugin(pathsToClean,cleanOptions)
  ],
})
module.exports = config
