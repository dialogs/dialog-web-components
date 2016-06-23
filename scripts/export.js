const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../src/components');
const exportFile = path.resolve(__dirname, '../src/index.js');

const code = fs.readdirSync(src)
  .map((name) => `export ${name} from './components/${name}/${name}.js';`)
  .join('\n')

fs.writeFileSync(exportFile, code);
