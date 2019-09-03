const gulp = require('gulp');
const jsonlint = require('gulp-jsonlint');

function lintTask(options) {
  // Requiers: dupe.
  gulp.task('lint', function() {
    return options
      .src(options.workingDir + '/**/conf.json')
      .pipe(jsonlint())
      .pipe(jsonlint.reporter());
  });
}

module.exports = lintTask;
