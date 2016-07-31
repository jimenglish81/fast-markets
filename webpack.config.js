const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isTest = process.env.NODE_ENV === 'test'

module.exports = (env) => {
  return {
    entry: {
      app: './js/app.js',
      vendor: ['lodash', 'react', 'react-dom'],
    },
    output: {
      filename: 'bundle.[name].[chunkhash].js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.html',
        }),
        isTest ? undefined : new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
        }),
    ].filter((b) => !!b),
  };
};
