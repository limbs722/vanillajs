const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    return {
        mode: 'development',
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.(ts|js)$/,
                    use: {
                        loader: 'babel-loader',
                    },
                    exclude: ['/node_modules'],
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: true },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: {
                        loader: 'file-loader',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './src/index.html' }),
            // new MiniCssExtractPlugin({
            //     filename: '[name].css',
            //     chunkFilename: '[id].css',
            // }),
        ],
        optimization: { minimize: true },
        // resolve: {
        //     modules: ['node_modules'],
        //     extensions: ['.ts', '.js', '.json', '.css', '.scss'],
        //     alias: {
        //         '@': path.join(__dirname, './src'),
        //     },
        // },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        output: {
            path: path.join(__dirname, './dist/src'),
            filename: '[name].js',
        },
        devtool: 'source-map',
    };
};
