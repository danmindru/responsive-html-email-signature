'use strict';

const gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

function lessTask(options){
  // Requires: dupe.
  gulp.task(
    'less',
    function() {
      return options
        .src(options.workingDir + '/**/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest(options.workingDir));
    }
  );
}

module.exports = lessTask;
