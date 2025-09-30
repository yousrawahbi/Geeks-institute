const fs = require('fs').promises;
const path = require('path');

async function readAndDisplayFile() {
    try {
        const filePath = path.join(__dirname, 'files', 'file-data.txt');
        const content = await fs.readFile(filePath, 'utf8');
        console.log('File content:');
        console.log('-------------');
        console.log(content);
        console.log('-------------');
    } catch (error) {
        console.error('Error reading file:', error.message);
    }
}

module.exports = readAndDisplayFile;