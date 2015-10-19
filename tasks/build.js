'use strict';

var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    minifyHTML = require('gulp-minify-html'),
    preprocess = require('gulp-preprocess'),
    rename = require('gulp-rename'),
    wrench = require('wrench'),
    Q = require('q'),
    del = require('del');

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
          gulp.src([options.src + '/' + dir + '/**/*.html', '!' + options.src + '/**/*.inc.html'])
          .pipe(preprocess({
            context: item
          }))
          .pipe(inlineCss({
            applyTableAttributes: true,
            applyWidthAttributes: true,
            preserveMediaQueries: true,
            removeStyleTags: false
          }))
          .pipe(minifyHTML({quotes: true}))
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