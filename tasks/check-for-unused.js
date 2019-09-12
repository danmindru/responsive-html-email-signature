const gulp = require('gulp');
const fs = require('fs');
const chalk = require('chalk');
const { getConfigsForDir, getFilePathsForDir, log } = require('./util/util');

const OUTPUT_KEYWORD = '@echo';

// todo: needs a proper refactor.
function checkForUnusedTask(options) {
  gulp.task('check-for-unused', async done => {
    const configs = getConfigsForDir(options.workingDir, options.configurationFile);
    const unusedItems = await checkForUnusedItemsInConfigs(options.workingDir, configs);
    outputWarningsForUnusedItems(unusedItems, configs);

    done();
  });
}

// todo: find configs by id instead of using the index?
const outputWarningsForUnusedItems = (unusedItems, configs) => {
  const find = OUTPUT_KEYWORD;
  const regex = new RegExp(find, 'g');
  unusedItems.forEach((unusedInConfigs, index) => {
    const { dir } = configs[index];

    unusedInConfigs.forEach((unusedInConfItems, index) => {
      log.warn(
        `${unusedInConfItems.length} unused properties in ${dir}: ${unusedInConfItems
          .reduce((acc, cur) => (acc ? `${acc}, ${chalk.white(cur)}` : chalk.white(cur)), '')
          .replace(regex, '')}`
      );
    });
  });
};

/**
 * In a directory, checks for unused configs.
 *
 * @param { string } rootDir
 * @param { Array } configs Array of configs.
 */
const checkForUnusedItemsInConfigs = (rootDir, configs) => {
  return Promise.all(
    configs.map(async ({ dir, confItems }) => {
      return Promise.all(
        confItems.map(async confItem => {
          const definedStrings = Object.keys(confItem).map(key => `${OUTPUT_KEYWORD} ${key}`);
          const cwd = `${rootDir}/${dir}`;
          const files = await getFilePathsForDir(cwd);
          const htmlTemplates = await self.getHtmlTemplatesFromFilelist(files);
          const concatenatedTemplates = htmlTemplates.join('');

          return definedStrings.filter(str => concatenatedTemplates.includes(str));
        })
      );
    })
  );
};

// todo: should be util, so should the one in build.js
const getHtmlTemplatesFromFilelist = filelist => {
  return Promise.all(
    filelist
      .filter(file => !!file.match(/.*\.html/) && !file.match(/.*\.inc*\.html/))
      .map(
        htmlTemplate =>
          new Promise((resolve, reject) => {
            fs.readFile(htmlTemplate, 'utf8', (error, data) => {
              if (error) {
                reject(error);
              }

              resolve(data);
            });
          })
      )
  );
};

const self = {
  checkForUnusedTask,
  outputWarningsForUnusedItems,
  checkForUnusedItemsInConfigs,
  getHtmlTemplatesFromFilelist
};

module.exports = self;
