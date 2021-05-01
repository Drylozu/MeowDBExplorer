const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpack = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: process.env.NODE_ENV,
    stats: 'errors-only',
    entry: {
        main: './src/client/index.js',
        theme: './src/client/theme.js'
    },
    output: {
        clean: true,
        filename: `${isDev ? '[name]' : '[contenthash]'}.js`,
        path: path.join(__dirname, 'dist/public/assets/')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader, {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: `[local]${isDev ? '' : '-[hash:base64:6]'}`
                    }
                }
            }]
        }, {
            test: /\.css$/,
            include: /node_modules/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.(png|svg|jpe?g|gif)$/,
            type: 'asset/resource',
            generator: {
                filename: `images/${isDev ? '[name]' : '[contenthash]'}[ext]`
            }
        }]
    },
    plugins: [
        new WebpackBar({
            name: 'MeowDB Explorer Page'
        }),
        new MiniCssExtractPlugin({
            filename: `${isDev ? '[name]' : '[contenthash]'}.css`
        }),
        new htmlWebpack({
            template: './src/client/index.html',
            filename: '../index.html',
            favicon: './src/client/assets/icon.png',
            meta: {
                // Title
                'twitter:title': 'MeowDB Explorer',
                'og:title': 'MeowDB Explorer',
                'og:site_name': 'MeowDB Explorer',
                // Description
                'twitter:description': 'Explore the content of JSON files with this tool',
                'og:description': 'Explore the content of JSON files with this tool',
                description: 'Explore the content of JSON files with this tool'
            },
            base: '/'
        })
    ],
    optimization: {
        minimizer: [
            '...',
            ...(isDev ? [] : [new CssMinimizerPlugin()])
        ],
        runtimeChunk: 'single'
    }
};