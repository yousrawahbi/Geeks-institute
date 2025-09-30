const _ = require('lodash');
const math = require('./math.js');

console.log('Math Operations:');
console.log('5 + 3 =', math.add(5, 3));
console.log('5 * 3 =', math.multiply(5, 3));
console.log('5 - 3 =', math.subtract(5, 3));
console.log('6 / 3 =', math.divide(6, 3));

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('\nLodash Operations:');
console.log('Sum of numbers:', _.sum(numbers));
console.log('Shuffled numbers:', _.shuffle(numbers));
console.log('Chunked numbers:', _.chunk(numbers, 3));