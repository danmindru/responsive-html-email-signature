'use strict';

var gulp = require('gulp'),
    wrench = require('wrench');

var options = {
  src: 'src',
  dist: 'dist'
};

wrench.readdirSyncRecursive('./tasks').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./tasks/' + file)(options);
});

gulp.task('default', ['build', 'watch']);