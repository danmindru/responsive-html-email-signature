const gulp = require('gulp');
const del = require('del');

function dupeTask(options) {
  gulp.task('dupe', function() {
    del.sync([options.workingDir]);

    return options.src([options.sourceDir + '/**/*']).pipe(gulp.dest('./' + options.workingDir));
  });
}

module.exports = dupeTask;
