/**
 * Created by jerry on 2018/8/1.
 * 正式环境配置
 */
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: true,
      LOG_SHOW: false,
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})