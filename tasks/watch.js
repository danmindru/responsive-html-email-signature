'use strict';

var gulp = require('gulp');

function watchTask(options){
  gulp.task('watch', ['dupe', 'build'], function(){
    gulp.watch(
      [
        options.source + '/**/*.html',
        options.source + '/**/*.css',
        options.source + '/**/*.sass',
        options.source + '/**/*.less',
        options.source + '/**/conf.js'
      ],
      ['dupe', 'less', 'sass', 'postcss', 'build']
    );
  });
}

module.exports = watchTask;