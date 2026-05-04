const fs = require('fs');

['index.html', 'products.html'].forEach(file => {
  if (fs.existsSync(file)) {
    let text = fs.readFileSync(file, 'utf8');
    
    // Specifically target the exact mangled comment lines to clean them up
    // Match /* followed by anything with â and then */
    text = text.replace(/\/\*.*â.*\*\//g, (match) => {
      // Clean up the match by replacing all non-ascii characters with '-'
      return match.replace(/[^\x00-\x7F]/g, '-');
    });

    // Also let's check for any other 'â' outside of comments that might break the build.
    // The error `parse5 error code control-character-in-input-stream` means there are
    // unescaped control characters.
    
    // There are invisible control characters causing the issue, so we should 
    // remove them from the entire file. Control chars are \x00-\x08, \x0B-\x0C, \x0E-\x1F
    text = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F]/g, '');

    fs.writeFileSync(file, text, 'utf8');
    console.log(`Cleaned ${file}`);
  }
});
