import people from './data.js';

function calculateAverageAge(persons) {
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  return totalAge / persons.length;
}

const averageAge = calculateAverageAge(people);
console.log(`The average age is: ${averageAge.toFixed(2)}`);