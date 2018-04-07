const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'client.bundle.js'
    }
};
