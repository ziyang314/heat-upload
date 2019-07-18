const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/app.js'),
        wk: path.resolve(__dirname, '../src/wk.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')],
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-config-airbnb-base')
                }
           }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'test page',
            filename: 'index.html',
            template: './index.html',
            hash: true,
            inject: true,
            chunks: ['index']
        }),
    ]
}