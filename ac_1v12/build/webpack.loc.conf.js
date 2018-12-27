/**
 * Created by jerry on 2018/8/7.
 * 开发环境(本地)配置 启动命令 npm run loc
 */
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const htmlWebpackPlugin = require('html-webpack-plugin');
const buildTime = new Date().toLocaleString();

module.exports = merge(baseWebpackConfig, {
  devServer: {
    port: '8088', //设置端口号
    open: true,
    proxy: {
      '/dist/': {
        target: 'http://h5course.51talk.com',
        changeOrigin: true,
      },
      '/text/': {
        target: 'http://h5course.51talk.com',
        changeOrigin: true
      },
      '/assets/': {
        target: 'http://h5course.51talk.com',
        changeOrigin: true
      },
      '/browser-sync/': {
        target: 'http://h5course.51talk.com',
        changeOrigin: true
      }
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      title: buildTime,
      filename: 'index.html',
      template: "./src/index.local.html"
    }),
    new webpack.DefinePlugin({
      PRODUCTION: false,
      LOG_SHOW: true,
      H5COURSE_HEADURL: JSON.stringify('/dist/661352/01/index.html')
    })
  ]
})