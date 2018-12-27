const path = require('path');
const webpack = require('webpack');

//单独打包css
const extractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new extractTextPlugin('css/[name].css');

module.exports = {
    entry: {
        vendor : ["./src/js/vendor.js"],
        main: "./src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        publicPath: "/dist/"
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
                use: extractLESS.extract(['css-loader', 'less-loader'])
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
        }),
        extractLESS
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        open: true
    },
    devtool: "inline-source-map"
};