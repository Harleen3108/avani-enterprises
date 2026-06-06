const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const pagesDir = path.join(srcDir, 'pages');
const dummyHomeDir = path.join(pagesDir, 'dummyhome');
const componentsDir = path.join(srcDir, 'components');
const dummyDir = path.join(componentsDir, 'dummy');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

// 1. Collect files to move
const dummyHomeFiles = fs.existsSync(dummyHomeDir) ? fs.readdirSync(dummyHomeDir).filter(f => fs.statSync(path.join(dummyHomeDir, f)).isFile()) : [];
const dummyFiles = fs.existsSync(dummyDir) ? fs.readdirSync(dummyDir).filter(f => fs.statSync(path.join(dummyDir, f)).isFile()) : [];

const fileMappings = [];

dummyHomeFiles.forEach(f => {
    let newName = f.replace(/^DH/, '');
    if (newName === 'Privacy.tsx') newName = 'PrivacyPolicy.tsx';
    if (newName === 'Terms.tsx') newName = 'TermsConditions.tsx';
    if (newName === 'Products.tsx') newName = 'OurProducts.tsx';
    
    fileMappings.push({
        oldPath: path.join(dummyHomeDir, f),
        newPath: path.join(pagesDir, newName),
        oldName: f.replace(/\.tsx$/, ''),
        newName: newName.replace(/\.tsx$/, '')
    });
});

dummyFiles.forEach(f => {
    let newName = f.replace(/^Dummy/i, '');
    if (newName === 'globalpresence.tsx') newName = 'GlobalPresenceComponent.tsx'; // to avoid conflict if any
    
    fileMappings.push({
        oldPath: path.join(dummyDir, f),
        newPath: path.join(componentsDir, newName),
        oldName: f.replace(/\.tsx$|\.css$/, ''),
        newName: newName.replace(/\.tsx$|\.css$/, '')
    });
});

// Rename rules for file contents
const nameReplacements = [
    { from: /DummyHome/g, to: 'Home' },
    { from: /DummyNavbar/g, to: 'Navbar' },
    { from: /DummyFooter/g, to: 'Footer' },
    { from: /DHLayout/g, to: 'DHLayout' }, // Keep DHLayout name for now to avoid conflict with AppLayout? Actually AppLayout is internal to App.tsx. Let's rename to MainLayout
    { from: /DHAbout/g, to: 'About' },
    { from: /DHServices/g, to: 'Services' },
    { from: /DHContact/g, to: 'Contact' },
    { from: /DHProjects/g, to: 'Projects' },
    { from: /DHBlog/g, to: 'Blog' },
    { from: /DHBlogDetail/g, to: 'BlogDetail' },
    { from: /DHGlobalPresence/g, to: 'GlobalPresence' },
    { from: /DHCareers/g, to: 'Careers' },
    { from: /DHCareerDetail/g, to: 'CareerDetail' },
    { from: /DHNewsletters/g, to: 'Newsletters' },
    { from: /DHNewsletterDetail/g, to: 'NewsletterDetail' },
    { from: /DHCourses/g, to: 'Courses' },
    { from: /DHCourseDetail/g, to: 'CourseDetail' },
    { from: /DHCaseStudies/g, to: 'CaseStudies' },
    { from: /DHServiceDetail/g, to: 'ServiceDetail' },
    { from: /DHProjectDetail/g, to: 'ProjectDetail' },
    { from: /DHPrivacy/g, to: 'PrivacyPolicy' },
    { from: /DHTerms/g, to: 'TermsConditions' },
    { from: /DHProducts/g, to: 'OurProducts' }
];

fileMappings.forEach(m => {
    if (m.oldName === 'DHLayout') nameReplacements.push({ from: /DHLayout/g, to: 'MainLayout' });
});

// Update content function
function updateContent(content, filePath) {
    // 1. Replace component names
    nameReplacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });

    // 2. Fix import paths string (crude but effective)
    // From pages/dummyhome/ to pages/ -> going up one less directory
    // e.g. "../../components/dummy/" -> "../components/"
    content = content.replace(/\.\.\/\.\.\/components\/dummy\//g, '../components/');
    content = content.replace(/\.\.\/\.\.\/components\//g, '../components/');
    content = content.replace(/\.\.\/components\/dummy\//g, '../components/');
    content = content.replace(/\.\.\/dummy\//g, '../components/'); // if they used ../dummy from pages/dummyhome
    
    // from components/dummy to components -> one less directory
    content = content.replace(/\.\.\/\.\.\/pages\/dummyhome\//g, '../pages/');
    content = content.replace(/\.\.\/pages\/dummyhome\//g, '../pages/');
    content = content.replace(/\.\.\/dummyhome\//g, '../pages/');

    // sibling imports in pages/dummyhome
    content = content.replace(/\.\/dummyhome\//g, './');
    content = content.replace(/\.\/dummy\//g, './');
    
    // Remove DH/Dummy from import paths
    content = content.replace(/\/DH([A-Z])/g, '/$1');
    content = content.replace(/\/Dummy([A-Z])/gi, '/$1');

    return content;
}

// Perform migrations
fileMappings.forEach(mapping => {
    if (fs.existsSync(mapping.oldPath)) {
        let content = fs.readFileSync(mapping.oldPath, 'utf8');
        content = updateContent(content, mapping.newPath);
        
        // Write to new location
        fs.writeFileSync(mapping.newPath, content, 'utf8');
        // Delete old file
        fs.unlinkSync(mapping.oldPath);
        console.log(`Moved ${mapping.oldPath} -> ${mapping.newPath}`);
    }
});

// Update all other files in src
const allFiles = walk(srcDir);
allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = updateContent(content, file);
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated imports in ${file}`);
    }
});

console.log('Migration complete.');
