// // Exercice1

// // Part1

// const people = ["Greg", "Mary", "Devon", "James"];

// // 1)Write code to remove “Greg” from the people array.
// people.shift();

// // 2)Write code to replace “James” to “Jason”.
// people[3]="Jason"
// console.log(people);

// // 3)Write code to add your name to the end of the people array.

// console.log(people.push("Yousra"));

// // 4)Write code that console.logs Mary’s index. take a look at the indexOf method on Google.

// console.log(people.indexOf("Mary"));

// // 5)Write code to make a copy of the people array using the slice method.
// // The copy should NOT include “Mary” or your name.
// // Hint: remember that now the people array should look like this const people = ["Mary", "Devon", "Jason", "Yourname"];
// // Hint: Check out the documentation for the slice method

// let newpeople=people.slice(1,-1);

// // 6)Write code that gives the index of “Foo”. Why does it return -1 ?

// console.log(people.indexOf("Foo"));
// //it return -1 because Foo doesn't exist


// // 7)Create a variable called last which value is the last element of the array

// let pers=people[-1];
// // Hint: What is the relationship between the index of the last element in the array and the length of the array?
// // the last element has the index of the length -1


// //  Exercise 2 : Your favorite colors

// // Instructions
// // Create an array called colors where the value is a list of your five favorite colors.

// let colors = ["white", "blue", "yellow", "green", "pink"]; 

// // Loop through the array and as you loop console.log a string like so: “My #1 choice is blue”, “My #2 choice is red” ect… .
 
// for(let j=0; j<colors.length ; j++){
//     console.log("my #"+ (j+1) +" choice is "+colors[j]);
    
// }

// // Bonus: Change it to console.log “My 1st choice”, “My 2nd choice”, “My 3rd choice”, picking the correct suffix for each number.

// for(let j=0 ; j<colors.length; j++){
//     if (j==0) {
//         console.log("My 1st choice is "+colors[j])
//     }else if(j==1) {
//         console.log("My 2nd choice is "+colors[j])
//     }else if(j==2) {
//         console.log("My 3rd choice is "+colors[j])
//     } else {
//     console.log("My "+ (j+1) +"th  choice is "+colors[j])
//     }
// }

//  Exercise 3 : Repeat the question

// Instructions

// Prompt the user for a number.
// let num = prompt('Enter a number please:');

// Hint : Check the data type you receive from the prompt (ie. Use the typeof method)

// console.log (typeof(num));

// // While the number is smaller than 10 continue asking the user for a new number.
// do{
//    let num = prompt('Enter a number please:'); 
// }
// while (num<10) ;

// Tip : Which while loop is more relevant for this situation?

// Exercise 4 : Building Management

// Instructions:

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}
// Review about objects
// Copy and paste the above object to your Javascript file.
// Console.log the number of floors in the building.
console.log(building.numberOfFloors);

// Console.log how many apartments are on the floors 1 and 3.
console.log(building.numberOfAptByFloor.firstFloor);
console.log(building.numberOfAptByFloor.thirdFloor);

// Console.log the name of the second tenant and the number of rooms he has in his apartment.
console.log(building.nameOfTenants[1]);
let renter=building.nameOfTenants[1].toLowerCase();
console.log(building.numberOfRoomsAndRent[renter][0]);

// Check if the sum of Sarah’s and David’s rent is bigger than Dan’s rent.
//  If it is, than increase Dan’s rent to 1200.
let renter0=building.nameOfTenants[1].toLowerCase();
let renter1=building.nameOfTenants[0].toLowerCase();
let renter2=building.nameOfTenants[2].toLowerCase();


let rent0=building.numberOfRoomsAndRent[renter0][1];
let rent1=building.numberOfRoomsAndRent[renter1][1];
let rent2=building.numberOfRoomsAndRent[renter2][1];

if(rent1+rent2>rent0){
    rent0=building.numberOfRoomsAndRent[renter0][1]+=1200;
}
 console.log(building.numberOfRoomsAndRent[renter0][1]);
 

//  Exercise 5 : Family

// Instructions
// Create an object called family with a few key value pairs.

let family= {
    father:"James",
    mother:"Lea",
    numberOfChildren: 4
}
// Using a for in loop, console.log the keys of the object.

for(let k in family){
    console.log(k);
    
}
// Using a for in loop, console.log the values of the object.
for(let k in family){
    console.log(family[k]);
    
}

// Exercise 6 : Rudolf

// Instructions

const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
}
// Given the object above and using a for loop, console.log “my name is Rudolf the reindeer”
let sentence = "";
for(let k in details){
   sentence+= k +" "+ details[k]+" ";
};

console.log(sentence);


// Exercise 7 : Secret Group

// Instructions
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// A group of friends have decided to start a secret society.
// The society’s name will be the first letter of each of their names sorted in alphabetical order.
// Hint: a string is an array of letters

let soc = [];
for(let x in names){
    soc.push (names[x][0]);
};

console.log(soc.sort());

// Console.log the name of their secret society. The output should be “ABJKPS”

console.log(soc.join(""));