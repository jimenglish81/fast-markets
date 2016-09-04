const pkg = require('./package.json');
const { resolve } = require('path');
const curry = require('lodash/curry');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const filterExists = (a) => a.filter(Boolean);
const ifVal = (cond, val) => !!cond ? val : undefined;

module.exports = (env) => {
  const ifProd = curry(ifVal)(env.prod);

  return {
    entry: {
      app: './js/index.js',
      css: './styles/app.less',
      vendor: Object.keys(pkg.dependencies),
    },
    output: {
      filename: 'bundle.[name].[hash].js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    devServer: {
      quiet: false,
    },
    eslint: {
      configFile: '.eslintrc'
    },
    module: {
      loaders: [
        {
          test: /\.less$/,
          loader: 'style!css!autoprefixer!less',
        },
        {
          test: /\.js$/,
          loader: 'babel!eslint',
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          loader: 'json'
        },
      ],
    },
    externals: {
     'jsdom': 'window',
     'cheerio': 'window',
     'react/addons': true,
     'react/lib/ExecutionEnvironment': true,
     'react/lib/ReactContext': true,
    },
    plugins: filterExists([
        new HtmlWebpackPlugin({
          template: './index.html',
        }),
        ifProd(new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
        })),
        ifProd(new webpack.optimize.DedupePlugin()),
        ifProd(new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        })),
        ifProd(new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"',
          },
          VERSION: JSON.stringify(pkg.version),
        })),
        ifProd(new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
          },
        })),
    ]),
  };
};
