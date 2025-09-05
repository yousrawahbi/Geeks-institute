// Exercise 1 : Divisible by three

// Instructions

let numbers = [123, 8409, 100053, 333333333, 7]

// Loop through the array above and determine whether or not each number is divisible by three.
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i]%3 ==0) {
        console.log("Number "+ (i+1) + " is divisible by 3");
    }else{
        console.log("Number "+ (i+1) + " is not divisible by 3");
    }
    
}

// Each time you loop console.log true or false.
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i]%3 ==0) {
        console.log("True");
    }else{
        console.log("False");
    }
    
}

// Exercise 2 : Attendance

// Instructions

let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
}
// Given the object above where the key is the student’s name and the value is the country they are from.
// Prompt the student for their name.
let studentName = prompt('Enter a student name please:')
// If the name is in the object, console.log the name of the student and the country they come from.
// If the name is not in the object, console.log: "Hi! I'm a guest."
if (studentName in guestList) {
    console.log(`${studentName} is from ${guestList[studentName]} ` );
    

}else{
    console.log("Hi! I'm a guest.");
    
}

// Exercise 3 : Playing with numbers

// Instructions

let age = [20,5,12,43,98,55];
// Requirements : Don’t use built-in Javascript methods to answer the following questions. You have to create the logic by yourself. Use simple for loops.

// 1. Console.log the sum of all the numbers in the age array.
let sum=0;
for (let i = 0; i < age.length; i++) {
    sum += age[i] ;

}

    console.log(sum);
// 2. Console.log the highest age in the array.

let highst=age[0];
for (let i = 0; i < age.length; i++) {
    for (let j = 0; j < age.length; j++) {
        if (age[j]>highst) {
            highst=age[j];
        }
    }

}

    console.log(highst);