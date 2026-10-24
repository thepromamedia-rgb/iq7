const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync(require('path').join(__dirname, '..', 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
let checked = 0;
for (const [, attrs, source] of scripts) {
  if (/\bsrc\s*=/.test(attrs) || !source.trim()) continue;
  new vm.Script(source, { filename: `index.html:inline-script-${++checked}` });
}
console.log(`Inline JavaScript syntax: OK (${checked} script block(s))`);
