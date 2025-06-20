const fs = require('fs');
const path = require('path');

const areasDir = path.join(__dirname, 'src', 'pages', 'areas');
const files = fs.readdirSync(areasDir).filter(f => f.endsWith('.tsx') && f !== '[area].tsx');

// Match '};' followed by any whitespace/newlines (including \r\n), then 'return ('
const pattern1 = /\};[ \t]*(\r?\n)+[ \t]*return \(/g;

// Match '} ' at the end of file (missing closing brace)
const pattern2 = /\} $/g;

// Ensure proper file ending
const pattern3 = /\}\s*$/g;

files.forEach(file => {
  const filePath = path.join(areasDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix 1: Missing closing brace for removeFromCart function
  const removeFromCartPattern = /const removeFromCart = \(courseId: number\) => \{\n  setCartItems\(cartItems\.filter\(item => item\.id !== courseId\)\);\n  return \(/g;
  const removeFromCartReplacement = 'const removeFromCart = (courseId: number) => {\n  setCartItems(cartItems.filter(item => item.id !== courseId));\n};\n\n  return (';
  content = content.replace(removeFromCartPattern, removeFromCartReplacement);
  
  // Fix 2: Missing closing brace for main component function
  // If file ends with just one }, add another } to close the component function
  if (content.trim().endsWith('}')) {
    content = content.trim() + '\n}';
  }
  
  // Fix 3: Ensure proper file ending with newline
  if (!content.endsWith('\n')) {
    content = content + '\n';
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log('Done. Fixed all syntax issues in all location pages.'); 