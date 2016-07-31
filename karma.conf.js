const webpackConfig = require('./webpack.config')({ test: true });
const TEST_FILES = 'tests/**/*.test.js';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      TEST_FILES,
    ],
    preprocessors: {
      [TEST_FILES]: ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  })
}
