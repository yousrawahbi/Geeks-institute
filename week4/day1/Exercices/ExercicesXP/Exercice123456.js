////Exercice1

// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

// #1.1 - run in the console: 
// inside the funcOne function 3
funcOne()
// #1.2 What will happen if the variable is declared with const instead of let ?
// error bcoz we can't reqssign const

//#2
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

// #2.1 - run in the console:
funcThree()// inside the funcThree function 0
funcTwo()// no output but a=5
funcThree()// inside the funcThree function 5
// #2.2 What will happen if the variable is declared with const instead of let ?
// the output still 0


//#3
function funcFour() {
    window.a = "hello";
}


function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

// #3.1 - run in the console:
funcFour()//a= "hello"
funcFive()// inside the funcFive function hello

//#4
let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}


// #4.1 - run in the console:
funcSix()//inside the funcSix function test
// #4.2 What will happen if the variable is declared with const instead of let ?
// no problem the qre in different scopes

//#5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// #5.1 - run the code in the console
// in the if block 5
// outside of the if block 2

// #5.2 What will happen if the variable is declared with const instead of let ?
//same results different scope block


////Exercice2

// function winBattle(){
//     return true;
// }

// Transform the winBattle() function to an arrow function.

const winBattle=()=>{
    return true;
}

// Create a variable called experiencePoints.
 let experiencePoints

// Assign to this variable, a ternary operator. If winBattle() is true, the experiencePoints variable should be equal to 10, else the variable should be equal to 1.
winBattle()= true ? experiencePoints=10 :experiencePoints=1;


// Console.log the experiencePoints variable.
console.log(experiencePoints);

////Exercice3

//Write a JavaScript arrow function that checks whether the value of 
// the argument passed, is a string or not. The function should return true or false

const isString= (value)=> typeof value === "string";

////Exercise4

//Create a one line function (ie. an arrow function) that receives 
// two numbers as parameters and returns the sum.

const funcSum=(a,b)=> a+b;

////Exercise5 

// Create a function that receives a weight in kilograms and returns it in grams. (Hint: 1 kg is 1000gr)
// First, use function declaration and invoke it.
function convertWeight(kweight) {
    return kweight*1000;
}

// Then, use function expression and invoke it.
const gramWeight=function(kweight){
    return kweight*1000;
}

// Write in a one line comment, the difference between function declaration and function expression.
in function expression we store the function in a variable 

// Finally, use a one line arrow function and invoke it.

const convertWeight=(kweight)=> kweight*1000;



////Exercice6


// Create a self invoking function that takes 4 arguments:
//  number of children, partner’s name, geographic location, job title.
// The function should display in the DOM a sentence like "You will be a <job title> in 
// <geographic location>, and married to <partner's name> with <number of children> kids."
(function (numChild,partName,geoLoc,jobtitle) {
    alert("You will be a "+ jobtitle + "in " +geoLoc+ ", and married to "+partName+" with "+numChild+ " kids"  );
})("3","Ali","USA","SAHM")

(function(children, partner, location, job) {
    const sentence = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    document.getElementById('result').innerHTML = sentence;
})(3, "Ali", "New York", "SAHW");



////Exercice8