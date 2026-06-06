const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Replace "/dummyhome/" with "/"
    let newContent = content.replace(/\/dummyhome\//g, '/');
    // Replace "/dummyhome" (at end of path before quote) with "/"
    newContent = newContent.replace(/\/dummyhome(["'`])/g, '/$1');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated', file);
    }
});
