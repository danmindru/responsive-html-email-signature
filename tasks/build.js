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
  gulp.task('build', function(cb) {
    var promises = []

    del(options.dist).then(function(){
      wrench.readdirSyncRecursive(options.src).filter(function(file) {
        return (!file.match('/') && !file.match(/^\.+/g)) ? file : false
      }).forEach(function(dir){
        var confPath = './../' + options.src + '/' + dir + '/conf.js';
        delete require.cache[require.resolve(confPath)]
        promises.push(makeTemplates(dir, require(confPath)));
      });

      function makeTemplates(dir, confItems){
        confItems.forEach(function(item){
          var cwd = options.src + '/' + dir;

          gulp.src([cwd + '/**/*.html', '!' + cwd + '/**/*.inc.html'])
          .pipe(preprocess({
            context: item
          }))
          .pipe(inlineimg(cwd))
          .pipe(inlineCss({
            applyTableAttributes: true,
            applyWidthAttributes: true,
            preserveMediaQueries: true,
            removeStyleTags: false
          }))
          .pipe(minifyHTML({quotes: true}))
          .pipe(minifyInline())
          .pipe(rename(function rename(path){
            path.dirname = dir;
            path.basename += '-' + item.id;
            return path;
          }))
          .pipe(gulp.dest(options.dist));
        });
      }

      Q.all(promises).then(function(){ cb(); });
    });
  });
}

module.exports = buildTask