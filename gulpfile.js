const gulp = require('gulp');
const plumber = require('gulp-plumber');

const { SOURCE, DIST, WORKING_DIR, CONFIGURATION_FILE } = require('./constants');

const options = {
  source: SOURCE,
  dist: DIST,
  workingDir: WORKING_DIR,
  configurationFile: CONFIGURATION_FILE,
  src: function plumbedSrc() {
    return gulp.src.apply(gulp, arguments).pipe(plumber());
  }
};

/**
 * Load tasks from the '/tasks' directory.
 */
require('./tasks/build')(options);
require('./tasks/dupe')(options);
require('./tasks/less')(options);
require('./tasks/lint')(options);
require('./tasks/postcss')(options);
require('./tasks/sass')(options);
require('./tasks/check-for-missing')(options);
require('./tasks/check-deps')(options);

/* Runs the entire pipeline once. */
gulp.task('run-pipeline', gulp.series('dupe', 'less', 'sass', 'postcss', 'lint', 'build', 'check-for-missing'));

/* By default templates will be built into '/dist'. */
gulp.task(
  'default',
  gulp.series('run-pipeline', () => {
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
      gulp.series('run-pipeline')
    );
  })
);
