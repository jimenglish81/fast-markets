const pkg = require('./package.json');
const { resolve } = require('path');
const curry = require('lodash/curry');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

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
      colors: true,
      inline: true,
    },
    module: {
      loaders: [
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract({
            loader: 'css-loader!less-loader',
          }),
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
        {
          test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,
          loader: 'file-loader?name=[name].[ext]',
        },
      ],
    },
    plugins: filterExists([
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
          template: './index.html',
        }),
        new ExtractTextPlugin('bundle.css.[hash].css'),
        new webpack.LoaderOptionsPlugin({
          options: {
            eslint: {
              configFile: '.eslintrc',
            },
          },
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
