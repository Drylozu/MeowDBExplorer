const htmlWebpack = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
    stats: 'errors-only',
    entry: {
        main: './src/client/index.js',
        theme: './src/client/theme.js'
    },
    output: {
        filename: '[contenthash].js',
        path: require('path').join(__dirname, 'dist/public/')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[hash:base64:6]'
                        }
                    }
                }
            ]
        }, {
            test: /\.(png|svg|jpe?g|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    name: '[hash].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new WebpackBar({
            name: 'MeowDB Explorer Page'
        }),
        new htmlWebpack({
            template: './src/client/index.html',
            filename: 'index.html',
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
    ]
};