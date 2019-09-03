const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

function lessTask(options) {
  // Requires: dupe.
  gulp.task('less', function() {
    return options
      .src(options.workingDir + '/**/*.less')
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(rename({ extname: '.css' }))
      .pipe(gulp.dest(options.workingDir));
  });
}

module.exports = lessTask;
