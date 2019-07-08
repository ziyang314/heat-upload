const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/js/main.js',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, '../dist/js')
    }
}