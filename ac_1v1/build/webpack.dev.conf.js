/**
 * Created by jerry on 2018/7/27.
 * 开发环境(测试平台)配置 启动命令 npm run dev
 */
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
//自动上传到服务器
const WebpackSftpClient = require('webpack-sftp-client');

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: false,
      LOG_SHOW: true,
      H5COURSE_HEADURL: JSON.stringify('/dist/701941_1/01/index.html')
    }),
    //上传都测试平台指定位置
    new WebpackSftpClient({
      port: '22',
      host: '172.16.0.107',
      username: 'root',
      password: 'ccs2017',
      path: './dist/',
      remotePath: '/data/h5course/ac_1v1',
      verbose: true
    })
  ]
})