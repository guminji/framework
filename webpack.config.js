/**
 * Created by guminji on 2018/6/13.
 */
var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
    //ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:'./build/js/bussiness/index.js',
    devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, 'build/js/dist'),
        filename: 'bundle.js',
        //publicPath: "http://localhost:3000/dist/"

    },
    devServer: {
        contentBase: path.resolve(__dirname, "./build"),
        inline:true,
        hot:true,
        port:'3000'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './build/html/paopao.html'
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
    ]
};