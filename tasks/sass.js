'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename');

function sassTask(options){
  gulp.task('sass', ['dupe'], function(){
    return gulp.src(options.workingDir + '/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 5 versions']
      }))
      .pipe(rename({ extname: '.css' }))
      .pipe(gulp.dest(options.workingDir));
  });
}

module.exports = sassTask;