const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        heatmap: './src/heatmap.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')],
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
            title: 'test2 page',
            template: './index.html'
        }),
    ]
}