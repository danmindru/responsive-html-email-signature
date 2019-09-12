const test = require('ava');
const { checkForUnusedItemsInConfigs } = require('../../tasks/check-for-unused.js');
const { readFileSync } = require('../util');

test('getting templates from filelist', async t => {
  const configs = [
    { confItems: [readFileSync('tests/sample/configs/config-with-unused.json')], dir: 'dark' }
  ];
  const expect = [[[[]]]];
  const result = [await checkForUnusedItemsInConfigs('tests/sample', configs)];

  t.deepEqual(result, expect);
});
