const test = require('ava');
const { readFileSync } = require('../util');

test('dark signature output', async t => {
  const expected = readFileSync('tests/sample/dark/signature-dark.html');
  const built = readFileSync('dist/dark/signature-dark.html');

  t.deepEqual(expected, built);
});

test('dark signature reply output', async t => {
  const expected = readFileSync('tests/sample/dark/signature-reply-dark.html');
  const built = readFileSync('dist/dark/signature-reply-dark.html');

  t.deepEqual(expected, built);
});

test('light signature output', async t => {
  const expected = readFileSync('tests/sample/light/signature-light.html');
  const built = readFileSync('dist/light/signature-light.html');

  t.deepEqual(expected, built);
});

test('light signature reply output', async t => {
  const expected = readFileSync('tests/sample/light/signature-reply-light.html');
  const built = readFileSync('dist/light/signature-reply-light.html');

  t.deepEqual(expected, built);
});

test('light full mail output', async t => {
  const expected = readFileSync('tests/sample/light/full-mail-light.html');
  const built = readFileSync('dist/light/full-mail-light.html');

  t.deepEqual(expected, built);
});
