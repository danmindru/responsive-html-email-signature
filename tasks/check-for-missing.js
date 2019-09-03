const gulp = require('gulp');
const { getConfigsForDir, getFilePathsForDir } = require('./util/util');

function checkForMissingTask(options) {
  gulp.task('check-for-missing', done => {
    const configs = getConfigsForDir(options.workingDir, options.configurationFile);

    configs.map(({ dir, confItems }) => {
      confItems.forEach(async confItem => {
        const definedStrings = Object.keys(confItem).map(key => {
          return {
            src: `@echo ${key}`,
            used: false
          };
        });

        const cwd = `${options.workingDir}/${dir}`;
        const files = await getFilePathsForDir(cwd);
        const htmlTemplates = files.filter(file => !!file.match(/.*\.html/) && !file.match(/.*\.inc*\.html/)); // Read only CSS files.
        console.log(definedStrings, htmlTemplates);
      });

      done();
    });
  });
}

module.exports = checkForMissingTask;
