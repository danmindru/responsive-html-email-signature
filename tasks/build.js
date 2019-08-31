'use strict';

const gulp = require('gulp'),
  inlineCss = require('gulp-inline-css'),
  minifyHTML = require('gulp-minify-html'),
  minifyInline = require('gulp-minify-inline'),
  preprocess = require('gulp-preprocess'),
  rename = require('gulp-rename'),
  klaw = require('klaw'),
  fs = require('fs'),
  Q = require('q'),
  del = require('del'),
  jsonlint = require('jsonlint'),
  inlineimg = require('gulp-inline-images-no-http'),
  path = require('path');

function buildTask(options) {
  // Requires: 'dupe', 'less', 'sass', 'postcss', 'lint'.
  gulp.task(
    'build',
    function build(done) {
      /** Makes templates for a given directory & its configurations.
       * @function makeTemplates
       * @param {String} dir Directory to make templates from.
       * @param {Array} confItems A list of configurations objects (usually persons) to make templates from.
       */
      function makeTemplates(dir, confItems) {
        confItems.forEach(function handleConf(conf) {
          var cwd = options.workingDir + '/' + dir;
          var stylesheets = [];

          /**
           * Find stylesheets relative to the CWD & generate <link> tags.
           * This way we can automagically inject them into <head>.
           */
          klaw(cwd)
            .on('readable', function walkTemplateDir() {
              var stylesheet;

              while ((stylesheet = this.read())) {
                var relativePath = __dirname.substring(0, __dirname.lastIndexOf('/')) + '/tmp/' + dir;
                stylesheets.push(stylesheet.path.replace(relativePath, ''));
              }
            })
            .on('end', function finishedTemplateDirWalk() {
              conf.stylesheets = stylesheets
                .filter(function filterFiles(file) {
                  /* Read only CSS files. */
                  return file.match(/.*\.css/) ? true : false;
                })
                .reduce(function(prev, current, index, acc) {
                  var cssPath = path.win32.basename(current);
                  return (prev += '<link rel="stylesheet" href="' + cssPath + '">');
                }, '');

              options
                .src([cwd + '/**/*.html', '!' + cwd + '/**/*.inc.html'])
                .pipe(
                  preprocess({
                    context: conf
                  })
                )
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
            });
        });
      }

      /** Clean up & then read 'src' to generate templates (build entry point). */
      del(options.dist)
        .then(function buildStart() {
          /**
           * Loop through dirs and load their conf files.
           * Promisify all 'makeTemplate' calls and when resolved, make a call to the task (`cb`) to let gulp know we're done.
           */
          var files = [];
          var promises = [];

          fs.readdirSync('./' + options.workingDir).forEach(function readConfigurations(dir) {
            /** NB: For 'watch' to properly work, the cache needs to be deleted before each require. */
            var confPath = '../tmp/' + dir + '/conf.json';
            var current = null;
            var confItems;

            delete require.cache[require.resolve(confPath)];
            current = require(confPath);
            if (current && current.length) {
              confItems = [...current];
            } else {
              confItems = [current];
            }

            promises.push(makeTemplates(dir, confItems));
          });

          Q.all(promises);
        })
        .then(() => done())
        .catch((err) => console.log(err));
    }
  );
}

module.exports = buildTask;
