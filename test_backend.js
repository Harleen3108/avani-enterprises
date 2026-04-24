const axios = require('axios');

async function testBackend() {
    try {
        const res = await axios.get('http://localhost:5000/api/info');
        console.log('Backend /api/info:', res.data);
    } catch (err) {
        console.error('Backend /api/info failed:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        }
    }

    try {
        const res = await axios.get('http://localhost:5000/api/newsletters');
        console.log('Backend /api/newsletters:', res.data.success);
    } catch (err) {
        console.error('Backend /api/newsletters failed:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        }
    }

    try {
        const res = await axios.get('http://localhost:5000/blogs?limit=3');
        console.log('Backend /blogs:', res.data.success);
    } catch (err) {
        console.error('Backend /blogs failed:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        }
    }
}

testBackend();
