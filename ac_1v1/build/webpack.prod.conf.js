/**
 * Created by jerry on 2018/7/27.
 * 正式环境配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: true,
      LOG_SHOW: false
    }),
    //压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})