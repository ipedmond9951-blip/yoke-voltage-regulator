const fs = require('fs');
const content = fs.readFileSync('./scripts/generate-avr-articles.js', 'utf8');

// Extract all slugs
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(content)) !== null) {
  slugs.push(match[1]);
}
console.log('Total themes:', slugs.length);

// Check what script is supposed to do with args
const args = process.argv.slice(2);
console.log('Args received:', args);

if (args.length >= 2) {
  const start = parseInt(args[0]);
  const count = parseInt(args[1]);
  console.log('Start index:', start, 'Count:', count);
  
  // Get themes for this batch
  for (let i = start; i < start + count && i < slugs.length; i++) {
    console.log('Theme', i, ':', slugs[i]);
  }
}