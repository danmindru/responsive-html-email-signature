'use strict';

var gulp = require('gulp');

function watchTask(options){
  //@todo watch CSS
  gulp.task('watch', function(){
    gulp.watch([options.src + '/**/*.html'], ['build']);
  });
};

module.exports = watchTask