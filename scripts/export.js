const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../src/components');
const exportFile = path.resolve(__dirname, '../src/index.js');


const fileNames = fs.readdirSync(src);
const codeLines = fileNames.map(
  (name) => `export ${name} from './components/${name}/${name}.js';`
);
const code = codeLines.join('\n') + '\n';

fs.writeFileSync(exportFile, code);
