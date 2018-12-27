const path = require('path');
const webpack = require('webpack');

//单独打包css
const extractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new extractTextPlugin('css/[name].[contenthash:6].css');
//自动上传到服务器
const WebpackSftpClient = require('webpack-sftp-client');
//单独处理生成html
const htmlWebpackPlugin = require('html-webpack-plugin');
//生成日期标志
const buildTime = new Date().toLocaleString();
//编译之前清理目录
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        vendor : ["./src/js/vendor.js"],
        main: "./src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[chunkhash:6].js",
        chunkFilename: 'js/[name].[chunkhash:6].js',
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/i,
                use: extractLESS.extract(['css-loader', 'postcss-loader', 'less-loader'])
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|cur)$/,
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
        new CleanWebpackPlugin(['dist/js/*', 'dist/css/*']),
        extractLESS,
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')
                ]
            }
        }),
        // new webpack.ProvidePlugin({
        //     $ : "jquery",
        //     jQuery : "jquery",
        //     "window.jQuery" : "jquery"
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"]
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new htmlWebpackPlugin({
          title: buildTime,
          filename: 'index.html',
          template: "./src/index.html"
        })

        /*new WebpackSftpClient({
            port: '22',
            host: '172.16.0.107',
            username: 'root',
            password: 'ccs2017',
            path: './dist/',
            remotePath: '/data/h5course/game-test1',
            // Show details of uploading for files
            verbose: true
        })*/

    ]
};