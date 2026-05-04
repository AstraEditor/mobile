const path = require('path');
const { DefinePlugin, ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                type: 'javascript/auto',
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.(svg|png|wav|gif|jpg|mp3|woff2|hex)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'static/assets/',
                    esModule: false
                }
            },
            {
                test: /\.(vert|frag|glsl)$/,
                loader: 'raw-loader',
                options: {
                    esModule: false
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                                exportLocalsConvention: 'camelCase'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-import',
                                    'postcss-simple-vars',
                                    'autoprefixer'
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "url": require.resolve("url")
        }
    },
    plugins: [
        new ProvidePlugin({
            process: 'process/browser'
        })
    ]
};

module.exports = {
    ...base,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/',
        clean: true
    },
    entry: {
        index: './src/main.jsx'
    },
    plugins: [
        ...base.plugins,
        new DefinePlugin({
            'process.env.ROUTING_STYLE': JSON.stringify('hash'),
            'process.env.ROOT': JSON.stringify('')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/scratch-blocks/media',
                    to: 'static/blocks-media/default'
                },
                {
                    from: 'node_modules/scratch-blocks/media',
                    to: 'static/blocks-media/high-contrast'
                },
                {
                    from: 'node_modules/scratch-gui/src/lib/themes/blocks/high-contrast-media/blocks-media',
                    to: 'static/blocks-media/high-contrast',
                    force: true
                },
                {
                    from: 'index.html',
                    to: '.'
                },
                {
                    from: 'public',
                    to: '.',
                    noErrorOnMissing: true
                }
            ]
        })
    ],
    resolve: {
        ...base.resolve,
        modules: [
            'node_modules'
        ],
        alias: {
            'react': path.resolve(__dirname, 'node_modules/react'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
            'scratch-gui$': path.resolve(__dirname, 'node_modules/scratch-gui/src/index.js'),
            'scratch-gui/': path.resolve(__dirname, 'node_modules/scratch-gui/src/'),
            'scratch-render-fonts$': path.resolve(__dirname, 'node_modules/scratch-gui/src/lib/tw-scratch-render-fonts'),
            '../reducers/gui': path.resolve(__dirname, 'node_modules/scratch-gui/src/reducers/gui.js'),
            './tw-scratch-paint': path.resolve(__dirname, 'node_modules/scratch-gui/src/lib/tw-scratch-paint.js')
        }
    },
    devServer: {
        port: 1949,
        hot: true,
        static: {
            directory: path.resolve(__dirname, 'public')
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};
