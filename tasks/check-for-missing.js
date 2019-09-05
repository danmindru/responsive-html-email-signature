const gulp = require('gulp');

function checkForUnusedTask(options) {
  gulp.task('check-for-unused', async done => {
    done();
  });
}

module.exports = checkForUnusedTask;
