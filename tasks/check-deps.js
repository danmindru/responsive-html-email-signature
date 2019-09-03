const gulp = require('gulp');
const david = require('gulp-david');

function checkDepsTask() {
  gulp.task('check-deps', function checkDeps() {
    gulp.src('package.json').pipe(david());
  });
}

module.exports = checkDepsTask;
