'use strict';

const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename');

function sassTask(options) {
  // Requires: dupe.
  gulp.task(
    'sass',
    gulp.series('dupe', function() {
      return options
        .src(options.workingDir + '/**/*.scss')
        .pipe(sass())
        .pipe(
          autoprefixer()
        )
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest(options.workingDir));
    })
  );
}

module.exports = sassTask;
