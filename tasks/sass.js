const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

function sassTask(options) {
  // Requires: dupe.
  gulp.task(
    'sass',
    gulp.series('dupe', function() {
      return options
        .src(options.workingDir + '/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest(options.workingDir));
    })
  );
}

module.exports = sassTask;
