'use strict';

const gulp = require('gulp'),
  fs = require('fs'),
  plumber = require('gulp-plumber');

const options = {
  source: 'templates',
  dist: 'dist',
  workingDir: 'tmp',
  src: function plumbedSrc() {
    return gulp.src.apply(gulp, arguments).pipe(plumber());
  }
};

/**
 * Load tasks from the '/tasks' directory.
 */
const build = require('./tasks/build')(options);
const checkDeps = require('./tasks/check-deps')(options);
const dupe = require('./tasks/dupe')(options);
const less = require('./tasks/less')(options);
const lint = require('./tasks/lint')(options);
const postcss = require('./tasks/postcss')(options);
const sass = require('./tasks/sass')(options);

/* By default templates will be built into '/dist' */
gulp.task(
  'default',
  gulp.series(
    ('dupe', 'less', 'sass', 'postcss', 'lint', 'build'),
    () => {
      /* gulp will watch for changes in '/templates'. */
      gulp.watch(
        [
          options.source + '/**/*.html',
          options.source + '/**/*.css',
          options.source + '/**/*.scss',
          options.source + '/**/*.less',
          options.source + '/**/conf.json'
        ],
        { delay: 500 },
        gulp.series('dupe', 'less', 'sass', 'postcss', 'lint', 'build')
      )
    }
  )
);
