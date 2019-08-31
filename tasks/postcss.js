'use strict';

const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

function postcssTask(options){
  // Requires: dupe.
  gulp.task(
    'postcss',
    function() {
      var processors = [
        autoprefixer()
      ];

      return options
        .src(options.workingDir + '/**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(options.workingDir));
    }
  );
}

module.exports = postcssTask;
