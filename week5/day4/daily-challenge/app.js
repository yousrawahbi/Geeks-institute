const greet = require('./greeting.js');
const displayColorfulMessage = require('./colorful-message.js');
const readAndDisplayFile = require('./read-file.js');

const userName = 'Developer';
console.log(greet(userName));
displayColorfulMessage();
readAndDisplayFile();