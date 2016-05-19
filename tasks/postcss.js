'use strict';

var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

function postcssTask(options){
  gulp.task('postcss', function () {
    var processors = [
      autoprefixer({browsers: ['Android', 'ChromeAndroid', 'FirefoxAndroid', 'Opera Mini', 'Chrome', 'Firefox', 'Explorer', 'Edge', 'iOS', 'Opera', 'Safari', 'ExplorerMobile']}),
    ];

    //@TODO src & dest
    return gulp.src('./src/*.css')
      .pipe(postcss(processors))
      .pipe(gulp.dest('./tmp'));
  });
}

module.exports = postcssTask;