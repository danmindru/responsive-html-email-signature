'use strict';
const https = require('https');
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const PluginError = require('plugin-error');
const through = require('through2');
const cheerio = require('cheerio');

const { log } = require('./util/util');

const PLUGIN_NAME = 'gulp-inline-images';
const MIME_TYPE_REGEX = /.+\/([^\s]*)/;
const INLINE_ATTR = 'inline';
const NOT_INLINE_ATTR = `!${INLINE_ATTR}`;

function inlineImg(options = {}) {
  const selector = options.selector || 'img[src]';
  const attribute = options.attribute || 'src';
  const getHTTP = options.getHTTP || false;

  return through.obj(function(file, encoding, callback) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return callback();
    }

    if (file.isBuffer()) {
      const contents = file.contents.toString(encoding);
      // Load it into cheerio's virtual DOM for easy manipulation
      const $ = cheerio.load(contents);
      const inlineFlag = $(`img[${INLINE_ATTR}]`);
      // If images with an inline attr are found that is the selection we want
      const imgTags = inlineFlag.length ? inlineFlag : $(selector);
      let count = 0;

      imgTags.each(function() {
        const $img = $(this);
        const src = $img.attr(attribute);

        // Save the file format from the extension
        const extFormat = path.extname(src).substr(1);

        // If inlineFlag tags were found we want to remove the inline tag
        if (inlineFlag.length) {
          $img.removeAttr(INLINE_ATTR);
        }

        // Find !inline attribute
        const notInlineFlag = $img.attr(NOT_INLINE_ATTR);

        if (typeof notInlineFlag !== typeof undefined && notInlineFlag !== false) {
          // Remove the tag and don't process this file
          return $img.removeAttr(NOT_INLINE_ATTR);
        }

        // Count async ops
        count++;

        getSrcBase64(options.basedir || file.base, getHTTP, src, (err, result, resFormat, skipFormatting) => {
          if (err) {
            log.warn(`Failed to load http image. Check the format of ${src}.`);
            log.error(err);
          } else {
            // Need a format in and a result for this to work
            if (!skipFormatting) {
              if (result && (extFormat || resFormat)) {
                $img.attr('src', `data:image/${extFormat};base64,${result}`);
              } else {
                $img.attr('src', ``);
                $img.attr('alt', `Image not found, Please check Url`);
                log.warn(`Failed to read image. Check the format of ${src}.`);
              }
            }

            if (!--count) {
              file.contents = Buffer.from($.html());
              callback(null, file);
            }
          }
        });
      });

      // If no files are processing we don't need to wait as none were ever started
      if (!imgTags.length) {
        file.contents = Buffer.from($.html());
        callback(null, file);
      }
    }
  });
}

function getHTTPBase64(url, callback) {
  // Get applicable library
  const lib = url.startsWith('https') ? https : http;
  // Initiate a git request to our URL
  const req = lib.get(url, res => {
    // Check for redirect
    if (res.statusCode >= 301 && res.statusCode < 400 && res.headers.location) {
      // Redirect
      return getHTTPBase64(res.headers.location, callback);
    }
    // Check for HTTP errors
    if (res.statusCode < 200 || res.statusCode >= 400) {
      return callback(new Error('Failed to load page, status code: ' + res.statusCode));
    }
    // Get file format
    let format;
    if (res.headers['content-type']) {
      const matches = res.headers['content-type'].match(MIME_TYPE_REGEX);
      if (matches) {
        format = matches[1];
      }
    }

    // Create an empty buffer to store the body in
    let body = Buffer.from([]);

    // Append each chunk to the body
    res.on('data', chunk => (body = Buffer.concat([body, chunk])));

    // Done callback
    res.on('end', () => callback(null, body.toString('base64'), format));
  });

  // Listen for network errors
  req.on('error', err => callback(err));
}

function getSrcBase64(base, getHTTP, src, callback) {
  // TODO: @deprecated — since v11.0.0 url.parse should be replaced with url.URL() ctor
  if (!url.parse(src).hostname) {
    // Get local file
    const filePath = path.join(base, src);
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, 'base64', callback);
    } else {
      callback(null);
    }
  } else {
    // Get remote file
    if (getHTTP) {
      return getHTTPBase64(src, callback);
    } else {
      callback(null, src, null, true);
    }
  }
}

module.exports = {
  inlineImg,
  getHTTPBase64,
  getSrcBase64
};
