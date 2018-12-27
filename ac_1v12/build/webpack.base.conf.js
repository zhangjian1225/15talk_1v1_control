/**
 * Created by jerry on 2018/8/1.
 * 编译文件共用基础配置
 */
'use strict'

const path = require('path');
const webpack = require('webpack');
const projectRoot = path.resolve(__dirname, '../');

//单独打包css
const extractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new extractTextPlugin('css/[name].[contenthash:6].css');
//单独处理生成html
const htmlWebpackPlugin = require('html-webpack-plugin');
//生成日期标志
const buildTime = new Date().toLocaleString();
//编译之前清理目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
//拷贝一些文件到dist
const CopyWebpackPlugin = require('copy-webpack-plugin');

let useEslint = true;
let showEslintErrorsInOverlay = false;

const createLintingRule = () => ({
  test: /\.js$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [path.join(__dirname, '..', 'src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !showEslintErrorsInOverlay
  }
})

module.exports = {
  context: projectRoot,
  entry: {
    h5course: "./src/js/h5course.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[chunkhash:6].js",
    chunkFilename: 'js/[name].[chunkhash:6].js',
    publicPath: ""
  },
  module: {
    rules: [
      ...(useEslint ? [createLintingRule()] : []),
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract(['css-loader', 'postcss-loader', 'less-loader'])
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: "url-loader",
        query: {
          name: "image/[hash].[ext]",
          limit: 5000,
          publicPath: "../"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist/js/', './dist/css/'], {
      root: projectRoot
    }),
    extractLESS,
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')
        ]
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new htmlWebpackPlugin({
      title: buildTime,
      filename: 'h5course.html',
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {from: './src/image/audio_town.mp3', to: './image/'},
      {from: './src/image/init_img.jpg', to: './image/'},
      {from: './src/image/tg.png', to: './image/'}
    ])
  ]
}