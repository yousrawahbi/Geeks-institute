const greet = require('./greeting.js');
const displayColorfulMessage = require('./colorful-message.js');
const readAndDisplayFile = require('./read-file.js');

async function runChallenge() {
    console.log('=== NODE.JS DAILY CHALLENGE ===\n');
    
    console.log('1. BASIC MODULE SYSTEM:');
    console.log(greet('Node.js Developer'));
    console.log('');
    
    console.log('2. NPM MODULE INTEGRATION:');
    displayColorfulMessage();
    console.log('');
    
    console.log('3. FILE OPERATIONS:');
    await readAndDisplayFile();
    
    console.log('\n=== CHALLENGE COMPLETED SUCCESSFULLY! ===');
}

runChallenge();