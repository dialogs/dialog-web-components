const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../src');
const exportFile = path.resolve(__dirname, '../index.js');

const components = fs.readdirSync(src)
  .map((name) => `  ${name}: require('./src/${name}/${name}.js').default`)
  .join(',\n');

const exportList = `module.exports = {\n${components}\n};`;

fs.writeFileSync(exportFile, exportList);
