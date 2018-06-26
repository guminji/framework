/**
 * Created by guminji on 2018/6/13.
 */
var path = require('path')
var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
config.entry.unshift("webpack-dev-server/client?http://localhost:3000/");
//config.entry.unshift("webpack-dev-server/client?http://localhost:8099/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    //publicPath: config.output.publicPath,
    //contentBase: path.resolve(__dirname, "./build"),
    inline:true,
    hot:true,
    stats: {
        colors: true
    },
    port:3000,
    publicPath:config.output.publicPath
    //inline:true
});
server.listen(3000);