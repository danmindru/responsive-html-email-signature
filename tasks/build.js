'use strict';

var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    minifyHTML = require('gulp-minify-html'),
    minifyInline = require('gulp-minify-inline'),
    preprocess = require('gulp-preprocess'),
    rename = require('gulp-rename'),
    wrench = require('wrench'),
    Q = require('q'),
    del = require('del'),
    inlineimg = require('gulp-inline-image-html');

function buildTask(options){
  gulp.task('build', ['dupe'], function build() {
    var promises = [];

    /** Makes templates for a given directory & its configurations.
     * @function makeTemplates
     * @param {String} dir Directory to make templates from.
     * @param {Array} confItems A list of configurations objects (usually persons) to make templates from.
     */
    function makeTemplates(dir, confItems){
      confItems
        .forEach(function handleConf(conf){
          var cwd = options.workingDir + '/' + dir;

          gulp
            .src([cwd + '/**/*.html', '!' + cwd + '/**/*.inc.html'])
            .pipe(preprocess({
              context: conf
            }))
            .pipe(inlineimg(cwd))
            .pipe(inlineCss({
              applyTableAttributes: true,
              applyWidthAttributes: true,
              preserveMediaQueries: true,
              removeStyleTags: false
            }))
            //.pipe(minifyHTML({quotes: true}))
            //.pipe(minifyInline())
            .pipe(rename(function rename(path){
              path.dirname = dir;
              path.basename += '-' + conf.id;
              return path;
            }))
            .pipe(gulp.dest(options.dist));
        });
    }

    /** Clean up & then read 'src' to generate templates (build entry point). */
    del(options.dist).then(function buildStart(){
     /** Loop through dirs and load their conf files.
      * Promisify all 'makeTemplate' calls and when resolved, make a call to the task `cb` to let gulp know we're done.
      */
      wrench
        .readdirSyncRecursive('./' + options.workingDir)
        .filter(function filterFiles(file) {

          /* Read only folders, skip files. */
          return (!file.match('/') && !file.match(/^\.+/g)) ? file : false;
        })
        .forEach(function readConfigurations(dir){
          /** NB: For 'watch' to properly work, the cache needs to be deleted before each require. */
          var confPath = './../' + options.workingDir + '/' + dir + '/conf.js';
          delete require.cache[require.resolve(confPath)];
          promises.push(makeTemplates(dir, require(confPath)));
        });

      Q.all(promises);
    });
  });
}

module.exports = buildTask;