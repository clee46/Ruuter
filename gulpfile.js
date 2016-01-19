var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var gulpLoadPlugins = require('gulp-load-plugins');

var testFiles = ['./test/*test.js'];

var plugins = gulpLoadPlugins();
gulp.task('default', ['eslint_check', 'mocha_tests', 'watch']);
gulp.task('eslint_check', function() {
  return gulp.src(['**/*.js','!node_modules/**','!dist/*.js']).pipe(plugins.eslint(
    {
      'settings': {
        'ecmascript': 6
      },
      'ecmaFeatures': {
      },
      'env': {
        'browser': true,
        'jquery': true,
        'node': true,
        'mocha': true
      },
      'rules': {
        'semi': 1,
        'strict': 0,
        'indent': [2, 2],
        'quotes': [1, 'single'],
        'no-multi-spaces': [1, {
          'exceptions': {
            'VariableDeclarator': true,
            'FunctionExpression': true
          }
        }],
        'key-spacing': [0, {'align': 'value'}],
        'no-underscore-dangle': 0
      }
    }
  )).pipe(plugins.eslint.format()).pipe(plugins.eslint.failAfterError());
});
gulp.task('mocha_tests', function () {
  return gulp.src(testFiles, {read: false}).pipe(plugins.mocha({reporter: 'spec'}));
});
gulp.task('watch', function() {
  gulp.watch(['**/*.js', '!package.json', '!node_modules/**', '!dist/*.js'], ['eslint_check', 'mocha_tests']);
});
