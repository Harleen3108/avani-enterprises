const http = require('http');

function check(url) {
    http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            console.log(`URL: ${url}`);
            console.log(`Status: ${res.statusCode}`);
            console.log(`Data: ${data.substring(0, 100)}...`);
        });
    }).on('error', (err) => {
        console.error(`URL: ${url} - Error: ${err.message}`);
    });
}

check('http://localhost:5000/api/info');
check('http://localhost:5000/api/newsletters');
check('http://localhost:5000/blogs?limit=3');
check('http://localhost:5000/seo?page=/');
