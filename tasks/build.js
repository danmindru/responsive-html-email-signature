const gulp = require('gulp');
const inlineCss = require('gulp-inline-css');
const minifyHTML = require('gulp-minify-html');
const minifyInline = require('gulp-minify-inline');
const preprocess = require('gulp-preprocess');
const rename = require('gulp-rename');
const klaw = require('klaw');
const fs = require('fs');
const del = require('del');
const inlineimg = require('gulp-inline-images-no-http');
const path = require('path');

function buildTask(options) {
  const { configurationFile } = options;

  // Requires: 'dupe', 'less', 'sass', 'postcss', 'lint'.
  gulp.task('build', function build(done) {
    /**
     * Makes templates for a given directory & its configurations.
     *
     * @function makeTemplates
     * @param {String} dir Directory to make templates from.
     * @param {Array} confItems A list of configurations objects (usually persons) to make templates from.
     */
    function makeTemplates(dir, confItems) {
      return confItems.map(conf => {
        const cwd = options.workingDir + '/' + dir;
        const files = [];

        /**
         * Find stylesheets relative to the CWD & generate <link> tags.
         * This way we can automagically inject them into <head>.
         */
        return new Promise(resolve => {
          klaw(cwd)
            .on('readable', function walkTemplateDir() {
              let file;

              while ((file = this.read())) {
                const relativePath =
                  __dirname.substring(0, __dirname.lastIndexOf('/')) +
                  '/tmp/' +
                  dir;
                files.push(file.path.replace(relativePath, ''));
              }
            })
            .on('end', function finishedTemplateDirWalk() {
              /**
               * Creates a context of stylesheets to inject them into HTML files later.
               * Generates a list of <link> tags with the found stylesheets.
               */
              const context = Object.assign(conf, {
                stylesheets: files
                  .filter(file => !!file.match(/.*\.css/)) // Read only CSS files.
                  .reduce((acc, cur) => {
                    const cssPath = path.win32.basename(cur);
                    return (acc +=
                      '<link rel="stylesheet" href="' + cssPath + '">');
                  }, '')
              });

              options
                .src([cwd + '/**/*.html', '!' + cwd + '/**/*.inc.html'])
                .pipe(preprocess({ context }))
                .pipe(inlineimg())
                .pipe(
                  inlineCss({
                    applyTableAttributes: true,
                    applyWidthAttributes: true,
                    preserveMediaQueries: true,
                    removeStyleTags: false
                  })
                )
                .pipe(minifyHTML({ quotes: true }))
                .pipe(minifyInline())
                .pipe(
                  rename(function rename(path) {
                    path.dirname = dir;
                    path.basename += '-' + conf.id;
                    return path;
                  })
                )
                .pipe(gulp.dest(options.dist));

              resolve();
            });
        });
      });
    }

    /*
     * Clean up & then read from workingDir to generate templates.
     * For each found config, a template group will be generated through `makeTemplates`.
     */
    return del(options.dist)
      .then(function buildStart() {
        /**
         * Loop through dirs and load their conf files.
         * Promisify all 'makeTemplate' calls and when resolved, let gulp know we're done.
         */
        const promises = [];

        fs.readdirSync(options.workingDir).forEach(function readConfigurations(
          dir
        ) {
          const confPath = `../tmp/${dir}/${configurationFile}`;

          /** Exit with warn if no configuration file found. */
          if (!fs.existsSync(path.resolve(options.workingDir, confPath))) {
            return console.warn(
              `Missing configuration in "${dir}". Did you remember to create "${dir}/${configurationFile}"?`
            );
          }

          let current = null;
          let confItems;

          delete require.cache[require.resolve(confPath)]; // NB: For 'watch' to properly work, the cache needs to be deleted before each require.
          current = require(confPath);

          // Handle single objects or arrays of configs.
          if (current && current.length) {
            confItems = [...current];
          } else {
            confItems = [current];
          }

          promises.push(makeTemplates(dir, confItems));
        });

        Promise.all(promises);
      })
      .then(() => done())
      .catch(err => console.log(err));
  });
}

module.exports = buildTask;
