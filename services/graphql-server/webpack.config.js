/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal
    ? 'eval-cheap-module-source-map'
    : 'source-map',
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.ts'],
    // symlinks: false,
    // cacheWithContext: false,
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@queries': path.resolve(__dirname, './src/queries'),
      '@tests': path.resolve(__dirname, './tests'),
      '@generated': path.resolve(__dirname, './generated'),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  module: {
    rules: [
      // Need to use babel-loader for babel-plugin-transform-typescript-metadata polyfills
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      // {
      //   test: /\.(tsx?)$/,
      //   loader: 'ts-loader',
      //   exclude: [
      //     [
      //       path.resolve(__dirname, 'node_modules'),
      //       path.resolve(__dirname, '.serverless'),
      //       path.resolve(__dirname, '.webpack'),
      //     ],
      //   ],
      //   options: {
      //     transpileOnly: true,
      //     experimentalWatchApi: true,
      //   },
      // },
      {
        test: /\.(tsx?)$/,
        loader: 'babel-loader',
        exclude: [
          [
            //path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript',
          ],
          plugins: [
            'babel-plugin-transform-typescript-metadata',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            'babel-plugin-parameter-decorator',
            ['@babel/plugin-proposal-private-methods', { loose: true }],
            [
              '@babel/plugin-proposal-private-property-in-object',
              { loose: true },
            ],
          ],
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
