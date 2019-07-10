const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/app.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
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
            title: 'test page',
            template: './index.html'
        }),
    ]
}