const fs = require('fs');

module.exports = {
  readFileSync: path => fs.readFileSync(('./', path), 'utf8')
};
