'use strict';

var gulp = require('gulp'),
    jsonlint = require("gulp-jsonlint");

function lintTask(options){
  gulp.task('lint', ['dupe'], function(){
    return options
      .src(options.workingDir + '/**/conf.json')
      .pipe(jsonlint())
      .pipe(jsonlint.reporter());
  });
}

module.exports = lintTask;