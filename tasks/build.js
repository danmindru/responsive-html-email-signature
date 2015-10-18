'use strict';

var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css'),
    minifyHTML = require('gulp-minify-html'),
    preprocess = require('gulp-preprocess');

function buildTask(options){
  gulp.task('build', function() {

    gulp.src('./src/**/*.html')
      .pipe(preprocess({
        context: {
          signature: 'Med venlig hilsen / best regards,',
          name: 'Lars Normark Holmgaard',
          welcome: 'Hi there,',
          introParagraph: 'Thanks for writing up this email.<br/> We are delighted to reply with a custom footer template.',
          contactMain: 'Call 81100200 or email us at',
          contactMail: 'info@fadeit.dk',
          contactSecondary: 'Anelystparken 31D&nbsp;&nbsp;&#9679;&nbsp;&nbsp;DK-8381 Tilst&nbsp;&nbsp;&#9679;&nbsp;&nbsp;Aarhus<br />',
          logoUrl: 'http://fadeit.dk/!email/fadeit-logo.png',
          logoAlt: 'fadeit logo',
          website: 'http://fadeit.dk'
        }
      }))
      .pipe(inlineCss({
        applyTableAttributes: true,
        applyWidthAttributes: true,
        preserveMediaQueries: true
      }))
      .pipe(minifyHTML({quotes: true}))
      .pipe(gulp.dest('./dist/'))
  });
}

module.exports = buildTask