/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 16:55:59
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2018-12-19 10:28:09
 */
let path = require("path");
let os = require("os");
let HtmlwebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
let webpackCdnPlugin = require("./webpackCdnPlugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
let ROOT_PATH = path.resolve(__dirname);
let APP_PATH = path.resolve(ROOT_PATH, "src");
let BUILD_PATH = path.resolve(ROOT_PATH, "dist/");
const IP = require("ip").address();
console.log(IP);
const APIPORT = os.type() == "Darwin" ?
    "8090" :
    "80";
console.log(``)
module.exports = (env, options) => {
    return {
        //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
        entry: {
            bundle: path.resolve(APP_PATH, "index.js")
                // vendor: [   "react",   "react-dom",   "react-router-dom", "react-hot-loader",
                //   "redux" ]
        },
        //输出的文件名 合并以后的js会命名为bundle.js
        output: {
            path: BUILD_PATH,
            publicPath: "",
            filename: "js/[name].js"
        },
        externals: {},
        module: {
            rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader?sourceMap"
                ]
            }, {
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader?sourceMap",
                    "sass-loader?sourceMap"
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader?name=images/[hash:8].[name].[ext]"
                }]
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
                use: [{
                    loader: "babel-loader" //loader的名称（必须）
                }]
            }]
        },
        devServer: {
            historyApiFallback: true,
            open: true,
            proxy: {
                "/api/": {
                    target: `http://192.168.0.146:80/`,
                    changeOrigin: true,
                    pathRewrite: {
                        "^/api": ""
                    }
                }
            }
        },
        devtool: options.mode === "production" ?
            "" :
            "cheap-module-eval-source-map",
        //添加我们的插件 会自动生成一个html文件
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(options.mode),
                APIPORT: JSON.stringify(os.type() == "Darwin" ?
                        "8090" :
                        "80") //Darwin macos Windows_NT windows mac下面80端口有其他的用
            }),
            new HtmlwebpackPlugin({ title: "" }),
            new webpack.HotModuleReplacementPlugin(),
            // 默认会把所有入口节点的公共代码提取出来,生成一个common.js
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output both options are
                // optional
                filename: "css/[name].css",
                chunkFilename: "css/[id].css"
            }),
            // new webpackCdnPlugin({ css:
            // ["https://cdn.bootcss.com/bootstrap/4.1.1/css/bootstrap.css"], js:
            // ["https://cdn.bootcss.com/bootstrap/4.1.1/js/bootstrap.js"] }), new
            // BundleAnalyzerPlugin({ analyzerPort: 8899 })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: "commons",
                        chunks: "all",
                        minChunks: 3
                    }
                }
            },
            runtimeChunk: true
        }
    };
};