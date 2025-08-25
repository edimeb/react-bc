// update-controladdin.cjs
// Updates ControlAddIn.al with the latest JS and CSS filenames from al/dist/assets

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'al', 'dist', 'assets');
const controlAddInPath = path.join(__dirname, 'al', 'ControlAddIn.al');

// Find main JS, CSS, and React logo SVG files in assets/
const jsFile = fs.readdirSync(assetsDir).find(f => /^index-.*\.js$/.test(f));
const cssFile = fs.readdirSync(assetsDir).find(f => /^index-.*\.css$/.test(f));
const reactLogoFile = fs.readdirSync(assetsDir).find(f => /^react-.*\.svg$/.test(f));

if (!jsFile || !cssFile || !reactLogoFile) {
  console.error('Could not find main JS, CSS, or React logo SVG file in al/dist/assets.');
  process.exit(1);
}

// Read ControlAddIn.al
let content = fs.readFileSync(controlAddInPath, 'utf8');



// Replace Scripts, StyleSheets, and Images lines for assets/
content = content.replace(/Scripts = 'dist\/(assets\/)?[^']+';/, `Scripts = 'dist/assets/${jsFile}';`);
content = content.replace(/StyleSheets = 'dist\/(assets\/)?[^']+';/, `StyleSheets = 'dist/assets/${cssFile}';`);
content = content.replace(/Images = 'dist\/vite\.svg', 'dist\/(assets\/)?react-[^']+';/, `Images = 'dist/vite.svg', 'dist/assets/${reactLogoFile}';`);

fs.writeFileSync(controlAddInPath, content, 'utf8');
console.log('ControlAddIn.al updated with new JS and CSS filenames.');
