const fs = require('fs');
const path = require('path');
const klaw = require('klaw');
const chalk = require('chalk');

// todo test
/**
 * Given a directory, scans all directories in it (not deep) and returns found config items.
 *
 * @param { string } rootDir Dir to look into.
 * @param { string } configFileName Files to look for in each dir, i.e. conf.json
 */
const getConfigsForDir = (rootDir, configFileName) => {
  return fs
    .readdirSync(rootDir)
    .map(dir => {
      const confPath = `${dir}/${configFileName}`;

      /** Exit with warn if no configuration file found. */
      if (!fs.existsSync(path.resolve(rootDir, confPath))) {
        self.log.warn(`Missing configuration in "${dir}". Did you remember to create "${dir}/${configFileName}"?`);
        return false;
      }

      let current = null;
      let confItems;

      const resolvedPath = path.resolve(rootDir, confPath);
      delete require.cache[resolvedPath]; // NB: For 'watch' to properly work, the cache needs to be deleted before each require.
      current = require(resolvedPath);

      // Handle single objects or arrays of configs.
      if (current && current.length) {
        confItems = [...current];
      } else {
        confItems = [current];
      }

      return {
        dir,
        confItems
      };
    })
    .filter(config => config);
};

/**
 * Given a directory, gets all file paths in it.
 *
 * @param { string } dir Dir to get files paths for.
 */
const getFilePathsForDir = dir => {
  const files = [];

  return new Promise(resolve => {
    klaw(dir)
      .on('readable', function walkTemplateDir() {
        let file;

        while ((file = this.read())) {
          const relativePath = `${__dirname.substring(0, __dirname.lastIndexOf('/'))}/${dir}`;
          files.push(file.path.replace(relativePath, ''));
        }
      })
      .on('end', function finishedTemplateDirWalk() {
        resolve(files);
      });
  });
};

/**
 * Gets an array of html files in a filelist.
 *
 * @param { Array } filelist
 */
const getHtmlTemplatesFromFilelist = filelist => {
  return Promise.all(
    filelist
      .filter(file => file.match(/.*\.html/) || file.match(/.*\.inc*\.html/))
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

/**
 * Gets an array of css link tags from a filelist (if css files are in the filelist).
 *
 * @param { Array } filelist
 */
const getCssLinkTagsFromFilelist = filelist => {
  return filelist
    .filter(file => !!file.match(/.*\.css/)) // Read only CSS files.
    .reduce((acc, cur) => {
      const cssPath = path.win32.basename(cur);
      return (acc += '<link rel="stylesheet" href="' + cssPath + '">');
    }, '');
};

const log = {
  warn: (...messages) => {
    console.warn('🔵 ', chalk.yellow(messages));
  },

  log: (...messages) => {
    console.log('🔘 ', chalk.gray(messages));
  },

  error: (...messages) => {
    console.error('🔴 ', chalk.red(messages));
  }
};

const self = {
  log,
  getConfigsForDir,
  getFilePathsForDir,
  getHtmlTemplatesFromFilelist,
  getCssLinkTagsFromFilelist
};

module.exports = self;
