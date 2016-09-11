const wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./webpack.config')({ test: true });
const wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function(wallaby) {
  return {
    files: [
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false },
      { pattern: 'node_modules/chai/chai.js', instrument: false },
      { pattern: 'node_modules/lodash/chai.js', instrument: false },
      { pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      { pattern: 'src/js/actions/*.js', load: false },
      { pattern: 'src/js/actions/*.test.js', load: false, ignore: true }
    ],

    tests: [
      { pattern: 'src/js/actions/*.test.js', load: false }
    ],

    postprocessor: wallabyPostprocessor,

    // I'll assume that you are using ES6 and mocha
    //compilers: {
      'src/js/actions/*.js': wallaby.compilers.babel(),
    //},

    testFramework: 'mocha',

    debug: true,

    setup: function () {
      window.expect = chai.expect;
      window.__moduleBundler.loadTests();
    }
  };
}
