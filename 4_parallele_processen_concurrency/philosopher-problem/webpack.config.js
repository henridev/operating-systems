const path = require('path');

module.exports = {
    devtool: 'source-map',  // generate source map
    // bundling mode
    mode: 'production',
    // entry files
    entry: './src/index.ts',
    // output bundles (location)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },

    // file resolutions
    resolve: {
        extensions: ['.ts', '.js'],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },

    watch: true
};