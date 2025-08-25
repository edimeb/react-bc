// patch-assets-paths.cjs
// Removes leading slashes from asset paths in built JS files in dist/assets

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(assetsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace src: "/assets/xxx.svg" with src: "assets/xxx.svg"
  content = content.replace(/(["'])\/assets\//g, '$1assets/');
  // Replace src: "/react-xxx.svg" with src: "react-xxx.svg"
  content = content.replace(/(["'])\/react-/g, '$1react-');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched asset paths in ${file}`);
});
