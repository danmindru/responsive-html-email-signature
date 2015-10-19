'use strict';

var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    minifyHTML = require('gulp-minify-html'),
    preprocess = require('gulp-preprocess'),
    rename = require('gulp-rename'),
    wrench = require('wrench');

function buildTask(options){
  gulp.task('build', function() {

    wrench.readdirSyncRecursive('./src').filter(function(file) {
      return (!file.match('/') && !file.match(/^\.+/g)) ? file : false
    }).forEach(function(dir){
      var confPath = './../' + options.src + '/' + dir + '/conf.js'
      makeTemplates(dir, require(confPath));
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
        .pipe(gulp.dest('./dist/'));
      });
    }
  });
}

module.exports = buildTask