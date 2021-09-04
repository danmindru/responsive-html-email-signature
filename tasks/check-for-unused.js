const gulp = require('gulp');
const chalk = require('chalk');
const { getConfigsForDir, getFilePathsForDir, getHtmlTemplatesFromFilelist, log } = require('./util/util');

const OUTPUT_KEYWORD = '@echo';

function checkForUnusedTask(options) {
  gulp.task('check-for-unused', async done => {
    const configs = getConfigsForDir(options.workingDir, options.configurationFile);
    const unusedItems = await checkForUnusedItemsInConfigs(options.workingDir, configs);
    outputWarningsForUnusedItems(unusedItems, configs);

    done();
  });
}

/**
 * Outputs warnings for unused items.
 *
 * @param { Array<Array<string>> } unusedItems
 * @param { Array<object> } configs
 */
const outputWarningsForUnusedItems = (unusedItems, configs) => {
  const find = OUTPUT_KEYWORD;
  const regex = new RegExp(find, 'g');

  unusedItems.forEach((unusedInConfigs, index) => {
    const { dir } = configs[index];

    unusedInConfigs.forEach(unusedInConfItems => {
      const unusedItemsToLog = unusedInConfItems
        .filter(item => item !== `${OUTPUT_KEYWORD} id`)
        .filter(item => item !== '@echo inlineRemoteUrl');

      if (unusedItemsToLog.length) {
        log.warn(
          `${unusedItemsToLog.length} unused properties in ${dir}: ${unusedItemsToLog
            .reduce((acc, cur) => (acc ? `${acc}, ${chalk.white(cur)}` : chalk.white(cur)), '')
            .replace(regex, '')}`
        );
      }
    });
  });
};

/**
 * In a directory, checks for unused configs.
 *
 * @param { string } rootDir
 * @param { Array } configs Array of configs.
 */
const checkForUnusedItemsInConfigs = (rootDir, configs) =>
  Promise.all(
    configs.map(async ({ dir, confItems }) => {
      return Promise.all(
        confItems.map(async confItem => {
          const definedStrings = Object.keys(confItem).map(key => `${OUTPUT_KEYWORD} ${key}`);
          const cwd = `${rootDir}/${dir}`;
          const files = await getFilePathsForDir(cwd);
          const htmlTemplates = await getHtmlTemplatesFromFilelist(files);
          const concatenatedTemplates = htmlTemplates.join('');

          return definedStrings.filter(str => !concatenatedTemplates.includes(str));
        })
      );
    })
  );

const self = {
  checkForUnusedTask,
  outputWarningsForUnusedItems,
  checkForUnusedItemsInConfigs
};

module.exports = self;
