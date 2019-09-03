const fs = require('fs');
const path = require('path');
const klaw = require('klaw');

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
        console.warn(`Missing configuration in "${dir}". Did you remember to create "${dir}/${configFileName}"?`);
        return false;
      }

      let current = null;
      let confItems;

      delete require.cache[require.resolve(rootDir, confPath)]; // NB: For 'watch' to properly work, the cache needs to be deleted before each require.
      current = require(path.resolve(rootDir, confPath));

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

module.exports = {
  getConfigsForDir,
  getFilePathsForDir
};
