
// Exercise 1:
// "I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)"

// Exercise 2:
function displayStudentInfo(objUser){
    const {first, last} = objUser;
    return `Your full name is ${first} ${last}`;
}

// Exercise 3:
const users = { user1: 18273, user2: 92833, user3: 90315 };

// 1: 
const usersArray = Object.entries(users);
console.log(usersArray);

// 2: 
const multipliedArray = usersArray.map(user => [user[0], user[1] * 2]);
console.log(multipliedArray);

// Exercise 4:
"object"

// Exercise 5:
// Option 2 is correct
class Labrador extends Dog {
  constructor(name, size) {
    super(name);  // This calls the parent Dog constructor
    this.size = size;
  }
};

// Exercise 6:
// 1:
[2] === [2]
{} === {}

// 2:

console.log(object2.number)
console.log(object3.number)
console.log(object4.number)

// 1:
class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

// 2:
class Mammal extends Animal {
  sound(soundMade) {
    return `${soundMade} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

// 3:
const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo'));