const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '../dist');
const index = path.join(dist, 'index.html');
const fallback = path.join(dist, '404.html');
const noJekyll = path.join(dist, '.nojekyll');

if (!fs.existsSync(index)) {
  console.error('dist/index.html not found. Run the Webpack build first.');
  process.exit(1);
}

fs.copyFileSync(index, fallback);
fs.writeFileSync(noJekyll, '');

console.log('GitHub Pages fallback created: dist/404.html');
console.log('GitHub Pages Jekyll bypass created: dist/.nojekyll');
