'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

function lessTask(options){
  gulp.task('less', ['dupe'], function(){
    return gulp.src(options.workingDir + '/**/*.less')
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['last 5 versions']
      }))
      .pipe(rename({ extname: '.css' }))
      .pipe(gulp.dest(options.workingDir));
  });
}

module.exports = lessTask;