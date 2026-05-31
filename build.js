const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Paths
const sourceFile = path.join(__dirname, 'src', 'bookmarklet.js');
const templateFile = path.join(__dirname, 'src', 'index.template.html');
const indexFile = path.join(__dirname, 'index.html');
const minifiedFile = path.join(distDir, 'bookmarklet.min.js');
const urlFile = path.join(distDir, 'bookmarklet.url.txt');

// Read source JS
let code = fs.readFileSync(sourceFile, 'utf8');

// Basic minifier
function minify(js) {
  let output = js;

  // 1. Remove multi-line comments: /* ... */
  output = output.replace(/\/\*[\s\S]*?\*\//g, '');

  // 2. Remove single-line comments: // ... (avoiding http:// and https://)
  let lines = output.split('\n');
  lines = lines.map(line => {
    const commentIndex = line.indexOf('//');
    if (commentIndex !== -1) {
      if (commentIndex > 0 && line[commentIndex - 1] === ':') {
        return line;
      }
      return line.substring(0, commentIndex);
    }
    return line;
  });

  output = lines.join('\n');

  // 3. Normalize whitespace (newlines, tabs, multiple spaces)
  output = output.replace(/\s+/g, ' ');

  // 4. Clean spaces around symbols to compress further
  const symbols = ['{', '}', '(', ')', '=', '+', '-', '*', '/', ',', ';', ':', '?', '<', '>', '[', ']', '!'];
  symbols.forEach(symbol => {
    const escapedSymbol = '\\' + symbol;
    const regexBefore = new RegExp(`\\s+${escapedSymbol}`, 'g');
    const regexAfter = new RegExp(`${escapedSymbol}\\s+`, 'g');
    output = output.replace(regexBefore, symbol);
    output = output.replace(regexAfter, symbol);
  });

  return output.trim();
}

// Minify Javascript
const minifiedCode = minify(code);

// Save minified code
fs.writeFileSync(minifiedFile, minifiedCode, 'utf8');
console.log(`✓ Minified JS saved to: ${minifiedFile} (${minifiedCode.length} bytes)`);

// Generate URL encoded bookmarklet string
const encodedBookmarklet = 'javascript:' + minifiedCode
  .replace(/'/g, '%27')
  .replace(/"/g, '%22')
  .replace(/`/g, '%60')
  .replace(/\s/g, '%20');

// Save URL-encoded bookmarklet
fs.writeFileSync(urlFile, encodedBookmarklet, 'utf8');
console.log(`✓ URL-encoded Bookmarklet saved to: ${urlFile} (${encodedBookmarklet.length} bytes)`);

// 5. Generate index.html from template
if (fs.existsSync(templateFile)) {
  let templateHtml = fs.readFileSync(templateFile, 'utf8');
  
  // Escape HTML characters for code block to avoid parsing issues
  const escapedRawCode = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  let compiledHtml = templateHtml
    .replace(/\{\{BOOKMARKLET_URL\}\}/g, encodedBookmarklet)
    .replace(/\{\{RAW_SOURCE_CODE\}\}/g, escapedRawCode);
    
  fs.writeFileSync(indexFile, compiledHtml, 'utf8');
  console.log(`✓ Compiled installer saved to: ${indexFile}`);
} else {
  console.warn('⚠️ Warning: src/index.template.html not found! Skipping installer compilation.');
}

console.log('\nBookmarklet generation complete!');
