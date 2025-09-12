// // Exercise 1: 
const data = [
  {name: 'Butters', age: 3, type: 'dog'},
  {name: 'Cuty', age: 5, type: 'rabbit'},
  {name: 'Lizzy', age: 6, type: 'dog'},
  {name: 'Red', age: 1, type: 'cat'},
  {name: 'Joey', age: 3, type: 'dog'},
  {name: 'Rex', age: 10, type: 'dog'}
];

// 1
let sumLoop = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].type === 'dog') {
    sumLoop += data[i].age * 7;
  }
}
console.log(sumLoop);

// 2
const sumReduce = data.reduce((total, animal) => {
  if (animal.type === 'dog') {
    return total + (animal.age * 7);
  }
  return total;
}, 0);
console.log(sumReduce);


//// Exercise 2:
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';
const cleanEmail = userEmail3.trim();
console.log(cleanEmail);

// // Exercise 3:

const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

const userRoles = {};
users.forEach(user => {
  const fullName = `${user.firstName} ${user.lastName}`;
  userRoles[fullName] = user.role;
});
console.log(userRoles);
// // Exercise 4: 

const letters = ['x', 'y', 'z', 'z'];

// 1
const resultLoop = {};
for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  if (resultLoop[letter]) {
    resultLoop[letter]++;
  } else {
    resultLoop[letter] = 1;
  }
}
console.log(resultLoop);

// 2
const resultReduce = letters.reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1;
  return acc;
}, {});
console.log(resultReduce);