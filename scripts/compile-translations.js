/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 */
/* eslint no-sync:0 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const yaml = require('js-yaml');
const compileMessages = require('../src/utils/compileMessages');

const src = path.resolve(__dirname, '../src');
const components = path.resolve(src, 'components');
const files = glob.sync('*/l10n/*.yml', { cwd: components });

function parsePathname(pathname) {
  const matches = pathname.match(/([A-Za-z]+)\/l10n\/([A-Za-z]+)\.yml$/);
  return {
    name: matches[1],
    locale: matches[2]
  };
}

function parseMessages(pathname) {
  const filename = path.join(components, pathname);
  const content = fs.readFileSync(filename);
  return yaml.safeLoad(content);
}

const messages = files.reduce((result, pathname) => {
  const { name, locale } = parsePathname(pathname);
  if (!result[locale]) {
    result[locale] = {};
  }

  Object.assign(result[locale], compileMessages(name, parseMessages(pathname)));

  return result;
}, {});

const output = path.join(src, 'messages.json');
fs.writeFileSync(output, JSON.stringify(messages, null, '  '));
