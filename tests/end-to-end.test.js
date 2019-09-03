const test = require('ava');
const fs = require('fs');
const path = require('path');

test('dark signature output', async t => {
  const expected = fs.readFileSync(
    path.resolve('tests/sample/dark/signature-dark.html')
  );
  const built = fs.readFileSync(path.resolve('dist/dark/signature-dark.html'));

  t.deepEqual(expected, built);
});

test('dark signature reply output', async t => {
  const expected = fs.readFileSync(
    path.resolve('tests/sample/dark/signature-reply-dark.html')
  );
  const built = fs.readFileSync(
    path.resolve('dist/dark/signature-reply-dark.html')
  );

  t.deepEqual(expected, built);
});

test('light signature output', async t => {
  const expected = fs.readFileSync(
    path.resolve('tests/sample/light/signature-light.html')
  );
  const built = fs.readFileSync(
    path.resolve('dist/light/signature-light.html')
  );

  t.deepEqual(expected, built);
});

test('light signature reply output', async t => {
  const expected = fs.readFileSync(
    path.resolve('tests/sample/light/signature-reply-light.html')
  );
  const built = fs.readFileSync(
    path.resolve('dist/light/signature-reply-light.html')
  );

  t.deepEqual(expected, built);
});

test('light full mail output', async t => {
  const expected = fs.readFileSync(
    path.resolve('tests/sample/light/full-mail-light.html')
  );
  const built = fs.readFileSync(
    path.resolve('dist/light/full-mail-light.html')
  );

  t.deepEqual(expected, built);
});
