const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    target: 'web',
    experiments: {
        outputModule: true,
    },
    entry: {
        index: './src/index.js',
        // example: './src/example.js',
    },
    output: {
        filename: 'main.js',

        // filename: 'bundle.js',
        // filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: {
            type: 'module',
        },
        // publicPath: '/',
    },
    // optimization: {
    //     runtimeChunk: 'single',
    // },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: false,
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname),
            watch: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            postcssOptions: {
                                plugins: function () {
                                    // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('precss'),
                                        require('autoprefixer'),
                                    ]
                                },
                            },
                        },
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(svg|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
        ],
    },
}
