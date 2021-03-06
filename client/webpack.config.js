const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.js",    //Lấy nguồn từ file index.js
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[contenthash].js"
    },
    plugins: [
        new CleanWebpackPlugin(), //Dọn dẹp file dư thừa
        new HtmlWebpackPlugin({    //Tối ưu hóa file html
            title : "Caching",
            template: "./public/index.html",
            favicon: "./public/assets/favicon.png"
        }),
        new MiniCssExtractPlugin({     //Minify CSS
            filename: "style.min.css"
        }),
        new Dotenv({
            path: './.env',
            safe: true
        })
    ],
    optimization: {
        splitChunks: {  //Gom chung file thư viện
            cacheGroups : { //Cache
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
        minimizer : [new OptimizeCSSAssetsPlugin({}) /*Tối uu hóa file css */, new TerserJSPlugin({}) /*Minify JS*/]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,"css-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                  'url-loader?limit=10000',
                  'img-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: "file-loader"
            },
        ]
    },
    devServer: {    //Chạy webpack server
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    devtool: "inline-source-map", //source-map
    resolve: {
        alias: {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }
    }
}