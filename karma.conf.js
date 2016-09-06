const webpackConfig = require('./webpack.config')({ test: true });
const  _ = require('lodash');
const TEST_FILES = 'src/**/*.test.js';

//TODO - move from being postloader
const convertToKarmaWebpack = function(config) {
  return _.assign({}, config, {
    module: _.assign({}, config.module, {
      postLoaders: [
        {
          test: /\.(js)$/,
          exclude: /(test|node_modules|\.test\.(js)$)/,
          loader: 'istanbul-instrumenter'
        }
      ]
    })
  });
};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      TEST_FILES,
    ],
    preprocessors: {
      [TEST_FILES]: ['webpack'],
    },
    webpack: convertToKarmaWebpack(webpackConfig),
    webpackMiddleware: {
      noInfo: true,
    },
    plugins: ['karma-*'],
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    reporters: [ 'mocha', 'coverage' ],
    coverageReporter: {
      type: 'text'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
  })
}
