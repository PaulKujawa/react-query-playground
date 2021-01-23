const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env = {}, argv) => {
    const isProd = argv.mode === 'production' || argv.mode === undefined; // prod is default

    return {
        mode: isProd ? 'production' : 'development',
        entry: {
            index: './src/index.tsx'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx']
        },
        devtool: isProd ? 'source-map' : 'eval-cheap-source-map',
        devServer: {
            contentBase: './dist',
            open: true,
            hot: false,
        },
        module: {
            rules: [
                // HTML is not referenced in JS files but as template by `HtmlWebpackPlugin`.
                { test: /\.html$/, use: ['html-loader'] },
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
                { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            ]
        },
        plugins: [
            // reset output.path on build while !cleanStaleWebpackAssets avoids the deletion of index.html on incremental builds.
            new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), 
            
            // generate index.html that references output files dynamically.
            // A custom HTML template is needed for React's root div to be placed.
            new HtmlWebpackPlugin({
                template: './src/index.html',
                // favicon: './src/assets/favicon.ico'
            }),
        ],
    }
};