'use strict';

var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

function postcssTask(options){
  gulp.task('postcss', ['dupe'], function () {
    var processors = [
      autoprefixer({
        browsers: ['last 5 versions']
      })
    ];

    return options
      .src(options.workingDir + '/**/*.css')
      .pipe(postcss(processors))
      .pipe(gulp.dest(options.workingDir));
  });
}

module.exports = postcssTask;