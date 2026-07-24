const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);
const large = files
  .map(f => ({ f, s: fs.statSync(path.join(publicDir, f)).size }))
  .filter(x => x.s > 200000)
  .sort((a, b) => b.s - a.s);

console.log('Large files (>200KB):');
large.forEach(x => console.log(`  ${x.f}: ${(x.s / 1024 / 1024).toFixed(2)} MB`));
