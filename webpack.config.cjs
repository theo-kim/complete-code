const path = require("path");

module.exports = {
    entry: './client/src/ts/index.tsx',
    devtool: 'inline-source-map',
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'source.js',
        path: path.resolve(__dirname, 'client/dist'),
        library: 'client',
        libraryTarget: 'window'
    },
    mode: process.env.NODE_ENV
};