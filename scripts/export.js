const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const sections = require('../components.json');

const src = path.resolve(__dirname, '../src/components');
const exportFile = path.resolve(__dirname, '../src/index.js');

sections.push({
  name: 'Other',
  components: _.difference(
    fs.readdirSync(src),
    _(sections).map((section) => section.components).flatten().value()
  )
});

const codeLines = sections.reduce((result, section) => {
  const exports = section.components.map(
    (name) => `export ${name} from './components/${name}/${name}.js';`
  );

  return [
    ...result,
    `// ${section.name}`,
    ...exports
  ];
}, []);

const code = codeLines.join('\n') + '\n';

fs.writeFileSync(exportFile, code);
