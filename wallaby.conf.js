const wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./webpack.config')({ test: true });
const wallabyPostprocessor = wallabyWebpack(webpackConfig);


module.exports = function (wallaby) {
  return {
      files: [
          { pattern: 'src/actions/*.js', load: false },
          { pattern: 'src/actions/*.test.js', ignore: true }
      ],

      tests: [
          { pattern: 'src/**/*.test.js', load: false }
      ],

      postprocessor: wallabyPostprocessor,

      // I'll assume that you are using ES6 and mocha
      '**/*.js': wallaby.compilers.babel({ /* babel options if you don't have .babelrc */ }),

      testFramework: 'mocha',

      setup: function () {
          window.expect = chai.expect;
          window.__moduleBundler.loadTests();
      }
  };
}
