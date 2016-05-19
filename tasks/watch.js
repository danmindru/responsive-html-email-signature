'use strict';

var gulp = require('gulp');

function watchTask(options){
  gulp.task('watch', function(){
    //@todo watch less & sass files
    gulp.watch([options.src + '/**/*.html', options.src + '/**/*.css', options.src + '/**/conf.js'], ['dupe', 'postcss', 'less', 'sass', 'build', 'clean']);
  });
}

module.exports = watchTask;