const webpack               = require('webpack');
const path                  = require('path');
const htmlWebpackPlugin     = require('html-webpack-plugin');
const merge                 = require('webpack-merge');

const TARGET                = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

// postcss plugins
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var stylelint = require('stylelint');
var autoprefixer = require('autoprefixer');

const common = {
    // Entry accepts a path or an object of entries.
    // The build chapter contains an example of the latter.
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },

    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: PATHS.app
            }
        ],
        loaders: [
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader?sourceMap', ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']),
                //loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            }
        ]
    },

    postcss: function () {
        return [
            autoprefixer({
                browsers: ['last 2 versions']
            }),
            stylelint({
                rules: {
                    'color-hex-case': 'lower'
                }
            })
        ];
    },

    sassLoader: {
        includePaths: [path.join(__dirname, 'app/scss')]
    },

    plugins: [
        new htmlWebpackPlugin({
            title: 'vp24 react app'
        }),
        new ExtractTextPlugin('styles.css')
    ]
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            // Display only errors to reduce the amount of output.
            stats: 'errors-only',
            // Parse host and port from env so this is easy to customize.
            host: process.env.HOST,
            port: process.env.PORT || 2300
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}
if(TARGET === 'build') {
    module.exports = merge(common, {});
}